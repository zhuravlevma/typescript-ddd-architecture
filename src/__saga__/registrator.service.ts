import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Saga } from './models/saga.model';
import { DomainMessage } from 'src/__lib__/domain-message';
import { Compensation } from './models/compensation.model';
import { SagaStep } from './models/saga-step.model';
import { MessageOrmEntity } from 'src/__relay__/message.orm-entity';

@Injectable()
export class RegistatorService {
  constructor(
    @InjectRepository(Saga)
    private readonly sagaRepository: Repository<Saga>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  private async runCompensations(saga: Saga) {
    const compensations: Compensation[] = [];
    saga.steps.map((el) => {
      for (const compensation of el.compensations) {
        compensations.push(compensation);
      }
    });

    const messages = compensations.map(({ metadata }) => {
      const orm = new MessageOrmEntity();
      orm.reason = metadata.reason;
      orm.messageType = metadata.messageType;
      orm.payload = metadata.payload;
      orm.aggregateId = metadata.aggregateId;
      orm.aggregateName = metadata.aggregateName;
      orm.contextName = metadata.contextName;
      orm.correlationId = saga.correlationId;
      orm.messageName = metadata.messageName;
      orm.compensationEvent = {};
      orm.sagaId = saga.id;
      return orm;
    });

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(messages);
      return await transactionalEntityManager.save(saga);
    });
    return;
  }

  async createStepForSaga(event: DomainMessage) {
    const saga = await this.sagaRepository.findOne({
      where: { id: event.saga.sagaId },
      relations: ['steps', 'steps.compensations'],
    });

    if (saga === null) {
      throw new Error('Saga not found');
    }

    if (event.saga.runCompensation === true) {
      return this.runCompensations(saga);
    }

    const newCompensation = new Compensation();
    newCompensation.metadata = event.saga.compensation;
    newCompensation.compensationType = event.messageName;
    newCompensation.status = 'NONE';

    const newStep = new SagaStep();
    newStep.metadata = event;
    newStep.stepName = event.messageName;
    newStep.compensations = [newCompensation];
    newStep.status = 'PENDING';

    saga.steps.push(newStep);

    if (event.saga.isFinal === true) {
      saga.status = 'COMPLETED';
    }

    const saved = await this.sagaRepository.save(saga);

    return saved;
  }

  async createSaga(correlationId: string): Promise<string> {
    const saga = await this.sagaRepository.findOne({
      where: { correlationId },
      relations: ['steps', 'steps.compensations'],
    });

    if (saga === null) {
      const newSaga = new Saga();
      newSaga.correlationId = correlationId;
      newSaga.sagaType = 'compensation';
      newSaga.status = 'In Progress';
      newSaga.steps = [];
      const created = await this.sagaRepository.save(newSaga);
      return created.id;
    }
    return saga.id;
  }
}

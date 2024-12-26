import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Saga } from './models/saga.model';
import { DomainMessage } from 'src/__lib__/domain-message';
import { Compensation } from './models/compensation.model';
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
    console.log(event, 'NEW EVENT');

    const saga = await this.sagaRepository.findOne({
      where: { id: event.saga.sagaId },
      relations: ['steps', 'steps.compensations'],
    });

    if (saga === null) {
      throw new Error('Saga not found');
    }

    if (event.saga.runCompensation === true) {
      const messages = saga.compensate(event);

      console.log(messages, 'MESSAGES');

      return this.dataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(messages);
        return transactionalEntityManager.save(saga);
      });
    } else if (event.saga.isFinal === true) {
      saga.addCompleteStep(event);
      return this.sagaRepository.save(saga);
    }

    saga.addCommonStep(event);

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

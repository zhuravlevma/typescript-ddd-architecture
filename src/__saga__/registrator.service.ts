import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Saga } from './models/saga.model';
import { DomainMessage } from 'src/__lib__/domain-message';

@Injectable()
export class RegistatorService {
  private readonly logger = new Logger(RegistatorService.name);

  constructor(
    @InjectRepository(Saga)
    private readonly sagaRepository: Repository<Saga>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async createStepForSaga(event: DomainMessage) {
    this.logger.debug(`New step in saga for messageName=${event.messageName}`);
    const saga = await this.sagaRepository.findOne({
      where: { id: event.saga.sagaId },
      relations: ['steps', 'steps.compensations'],
    });

    if (saga === null) {
      throw new Error('Saga not found');
    }

    if (event.saga.runCompensation === true) {
      const messages = saga.compensate(event);
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
    this.logger.debug(`Create saga for correlationId ${correlationId}`);
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

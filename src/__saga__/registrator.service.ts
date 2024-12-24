import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saga } from './models/saga.model';
import { DomainMessage } from 'src/__lib__/domain-message';
import { Compensation } from './models/compensation.model';
import { SagaStep } from './models/saga-step.model';

@Injectable()
export class RegistatorService {
  constructor(
    @InjectRepository(Saga)
    private readonly sagaRepository: Repository<Saga>,
  ) {}

  // @RabbitSubscribe({
  //   exchange: config().rabbitmq.exchange,
  //   routingKey: config().topics.sagaReceived,
  //   queue: config().topics.sagaReceived,
  // })
  // async applySagaReceived(event: MessageOrmEntity): Promise<void> {
  //   const saga = await this.sagaRepository.findOne({
  //     where: { correlationId: event.correlationId },
  //     relations: ['steps', 'steps.compensations'],
  //   });

  //   console.log(event.messageName, 'msg name');

  //   if (!saga) {
  //     const newSaga = new Saga();
  //     newSaga.correlationId = event.correlationId;
  //     newSaga.sagaType = 'compensation';
  //     newSaga.status = 'In Progress';

  //     const compensation = new Compensation();
  //     compensation.metadata = event.compensationEvent;
  //     compensation.compensationType = event.messageName;
  //     compensation.status = 'PENDING';

  //     const newStep = new SagaStep();
  //     newStep.metadata = event;
  //     newStep.stepName = event.messageName;
  //     newStep.status = 'PENDING';
  //     newStep.compensations = [compensation];

  //     newSaga.steps = [newStep];

  //     const resp = await this.sagaRepository.save(newSaga);
  //     console.log(resp);
  //     return;
  //   }

  //   const newCompensation = new Compensation();
  //   newCompensation.metadata = event.compensationEvent;
  //   newCompensation.compensationType = event.messageName;
  //   newCompensation.status = 'PENDING';

  //   const newStep = new SagaStep();
  //   newStep.metadata = event;
  //   newStep.stepName = event.messageName;
  //   newStep.compensations = [newCompensation];

  //   saga.steps.push(newStep);

  //   if (event.isFinal === true) {
  //     saga.status = 'COMPLETED';
  //   }

  //   const saved = await this.sagaRepository.save(saga);

  //   console.log(saved);

  //   // if saga в статусе Failed то проверяем был ли этот шаг уже обработан в Failed (компенирован). если нет, то сохраняем его и выполняем компенсацию
  //   // if евент пришел сразу со статусом Failed, то зафиксировать и запустить компенсации на все пред шаги
  //   // if все ок

  //   // проверяем все сообщения предыдущие в каких они статусах, если там хоть один Failed, то сагу ставим в Failed и пускаем компенсации

  //   // if пришел повторный step с тем же сообщением, то ничего не делаем, сообщение в сагу уже было положено

  //   // if пришел новый евент с новым степом, то
  //   // проверяем его таймаут по последнему евенту, если там все ок, то записываем его в конец
  //   // если таймаут вышел за рамки, то сагу в Failed и инициируем компенсацию
  // }

  async createStepForSaga(event: DomainMessage) {
    const saga = await this.sagaRepository.findOne({
      where: { id: event.saga.sagaId },
      relations: ['steps', 'steps.compensations'],
    });

    if (saga === null) {
      throw new Error('Saga not found');
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

    console.log(saved, event.aggregateName, event.contextName, 'SAGAA');
    return saved;
  }

  async createSaga(correlationId: string): Promise<string> {
    const saga = await this.sagaRepository.findOne({
      where: { correlationId },
      relations: ['steps', 'steps.compensations'],
    });
    console.log(saga, 'hahahha');

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

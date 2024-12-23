import { Body, Controller, Post } from '@nestjs/common';
import { RegistatorService } from './registrator.service';

// Если счёт успешно создан, но доставка не может
// быть инициирована (например, нет доступного курьера), то счёт аннулируется, а резерв на складе снимается.

export class CreateSagaDto {
  correlationId: string;
}

@Controller('/saga')
export class RegistatorController {
  constructor(private readonly registatorService: RegistatorService) {}

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
  //     newStep.compensations;
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
  //   newStep.compensations;
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

  @Post('/')
  async createSaga(@Body() payload: CreateSagaDto) {
    return this.registatorService.createSaga(payload.correlationId);
  }

  // сделать крон джобу, которая все текущие саги будет проверять на таймауты и инициировать компенсации
}

// 1) резерв на складе / снятие резерва
// 2) счет успешно создан / компенсация на отмену счета
// 3) нашли курьера / курьер не найден

// резерв на складе -> счет успешно создан -> wait 2 min

// параллельно новый запрос изменяет состояние резерва на складе

// счет успешно создан -> создать отчет (хотя уже компенсации были получены)

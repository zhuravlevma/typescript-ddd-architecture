import { Body, Controller, Post } from '@nestjs/common';
import { RegistatorService } from './registrator.service';
import { DomainMessage } from 'src/__lib__/domain-message';
import { config } from 'src/config';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

// Если счёт успешно создан, но доставка не может
// быть инициирована (например, нет доступного курьера), то счёт аннулируется, а резерв на складе снимается.

export class CreateSagaDto {
  correlationId: string;
}

@Controller('/saga')
export class RegistatorController {
  constructor(private readonly registatorService: RegistatorService) {}

  @RabbitSubscribe({
    exchange: config().rabbitmq.exchange,
    routingKey: config().topics.sagaReceived,
    queue: config().topics.sagaReceived,
  })
  async applySagaReceived(event: DomainMessage): Promise<void> {
    const saga = await this.registatorService.createStepForSaga(event);

    console.log(saga);

    // if saga в статусе Failed то проверяем был ли этот шаг уже обработан в Failed (компенирован). если нет, то сохраняем его и выполняем компенсацию
    // if евент пришел сразу со статусом Failed, то зафиксировать и запустить компенсации на все пред шаги
    // if все ок

    // проверяем все сообщения предыдущие в каких они статусах, если там хоть один Failed, то сагу ставим в Failed и пускаем компенсации

    // if пришел повторный step с тем же сообщением, то ничего не делаем, сообщение в сагу уже было положено

    // if пришел новый евент с новым степом, то
    // проверяем его таймаут по последнему евенту, если там все ок, то записываем его в конец
    // если таймаут вышел за рамки, то сагу в Failed и инициируем компенсацию
  }

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

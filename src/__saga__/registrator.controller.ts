import { MessageOrmEntity } from 'src/__relay__/message.orm-entity';
import { config } from 'src/config';
import { Saga } from './models/saga.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

// Если счёт успешно создан, но доставка не может
// быть инициирована (например, нет доступного курьера), то счёт аннулируется, а резерв на складе снимается.

@Controller()
export class RegistatorController {
  constructor(
    @InjectRepository(Saga)
    private readonly sagaRepository: Repository<Saga>,
  ) {}

  @RabbitSubscribe({
    exchange: config().rabbitmq.exchange,
    routingKey: config().topics.sagaReceived,
    queue: config().topics.sagaReceived,
  })
  async applySagaReceived(event: MessageOrmEntity): Promise<void> {
    console.log(event.correlationId);
    const saga = await this.sagaRepository.findOne({
      where: { correlationId: event.correlationId },
    });

    if (!saga) {
      // создаем новую сагу, фиксируем евенты и компенсации. если сага сразу со статусом failed, то пускаем компенсации
      return;
    }

    // if saga в статусе Failed то проверяем был ли этот шаг уже обработан в Failed (компенирован). если нет, то сохраняем его и выполняем компенсацию
    // if евент пришел сразу со статусом Failed, то зафиксировать и запустить компенсации на все пред шаги
    // if все ок

    // проверяем все сообщения предыдущие в каких они статусах, если там хоть один Failed, то сагу ставим в Failed и пускаем компенсации

    // if пришел повторный step с тем же сообщением, то ничего не делаем, сообщение в сагу уже было положено

    // if пришел новый евент с новым степом, то

    // проверяем его таймаут по последнему евенту, если там все ок, то записываем его в конец
    // если таймаут вышел за рамки, то сагу в Failed и инициируем компенсацию
  }

  // сделать крон джобу, которая все текущие саги будет проверять на таймауты и инициировать компенсации
}

// 1) резерв на складе / снятие резерва
// 2) счет успешно создан / компенсация на отмену счета
// 3) нашли курьера / курьер не найден

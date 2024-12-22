import { Controller } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { OrderCreatedEvent } from 'src/cart/cart/domain/events/order-created.event';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { config } from 'src/config';

@Controller('/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @RabbitSubscribe({
    exchange: config().rabbitmq.exchange,
    routingKey: config().topics.orderCreated,
    queue: config().topics.orderCreated,
  })
  async applyOrderCreated(event: OrderCreatedEvent) {
    await this.paymentService.create(event);
  }
}

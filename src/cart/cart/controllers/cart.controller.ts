import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateCartInPort } from '../domain/ports/in/create-cart.in-port';
import { SavedCartResponseDto } from './dtos/response/saved-cart.response-dto';
import { CorrelationService } from 'src/__infrastructure__/correlation/correlation.service';
import { OrderCancelledEvent } from '../domain/events/order-cancelled.event';
import { config } from 'src/config';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@ApiTags('cart')
@Controller('/cart/carts')
export class CartController {
  constructor(
    private readonly createCartInteractor: CreateCartInPort,
    private readonly correlationService: CorrelationService,
  ) {}

  @RabbitSubscribe({
    exchange: config().rabbitmq.exchange,
    routingKey: config().topics.orderCancelled,
    queue: config().topics.orderCancelled,
  })
  async applySagaReceived(event: OrderCancelledEvent): Promise<void> {
    console.log(event, 'COMPENSATION WORK');
  }

  @ApiOkResponse({
    description: 'Saved cart',
    type: SavedCartResponseDto,
  })
  @Post('/')
  async createCart(): Promise<SavedCartResponseDto> {
    const correlationId = this.correlationService.getCorrelationId();
    const cart = await this.createCartInteractor.execute(correlationId);
    return SavedCartResponseDto.fromDomain(cart);
  }
}

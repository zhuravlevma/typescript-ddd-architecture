import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateCartInPort } from '../domain/ports/in/create-cart.in-port';
import { SavedCartResponseDto } from './dtos/response/saved-cart.response-dto';
import { CorrelationService } from 'src/__infrastructure__/correlation/correlation.service';
import { OrderCancelledEvent } from '../domain/events/order-cancelled.event';
import { config } from 'src/config';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { UpdateCartInPort } from '../domain/ports/in/update-cart.in-port';

@ApiTags('cart')
@Controller('/cart/carts')
export class CartController {
  constructor(
    private readonly createCartInteractor: CreateCartInPort,
    private readonly updateCartInteractor: UpdateCartInPort,
    private readonly correlationService: CorrelationService,
  ) {}

  @RabbitSubscribe({
    exchange: config().rabbitmq.exchange,
    routingKey: config().topics.orderCancelled,
    queue: config().topics.orderCancelled,
  })
  async applySagaReceived(event: OrderCancelledEvent): Promise<void> {
    await this.updateCartInteractor.execute({
      cartId: event.payload.cartId,
      isValid: false,
    });
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

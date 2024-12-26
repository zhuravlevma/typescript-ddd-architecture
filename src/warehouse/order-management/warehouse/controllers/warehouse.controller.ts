import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AddOrderInPort } from '../domain/ports/in/add-order.in-port';
import { CreateWarehouseInPort } from '../domain/ports/in/create-warehouse.in-port';
import { UpdateOrderInPort } from '../domain/ports/in/update-order.in-port';
import { CreateWarehouseDto } from './dtos/create-warehouse.dto';
import { SavedWarehouseResponseDto } from './dtos/response/saved-warehouse.response-dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { config } from 'src/config';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PaymentCompletedEvent } from 'src/cart/payment/events/payment-completed.event';

@ApiTags('warehouse')
@Controller('/warehouse/warehouses')
export class WarehouseController {
  constructor(
    private readonly addOrderInteractor: AddOrderInPort,
    private readonly createWarehouseInteractor: CreateWarehouseInPort,
    private readonly updateOrderInteractor: UpdateOrderInPort,
  ) {}

  @ApiOkResponse({
    description: 'Saved Wh with orders',
    type: SavedWarehouseResponseDto,
  })
  @Post('/')
  async createWarehouse(
    @Body() createWarehouseDto: CreateWarehouseDto,
  ): Promise<SavedWarehouseResponseDto> {
    const wh = await this.createWarehouseInteractor.execute(createWarehouseDto);
    return SavedWarehouseResponseDto.fromDomain(wh);
  }

  @ApiOkResponse({
    description: 'Saved Wh with orders',
    type: SavedWarehouseResponseDto,
  })
  @RabbitSubscribe({
    exchange: config().rabbitmq.exchange,
    routingKey: config().topics.paymentCompleted,
    queue: config().topics.paymentCompleted,
  })
  async applyPaymentCompleted(event: PaymentCompletedEvent): Promise<void> {
    await this.addOrderInteractor.execute(event);
  }

  @ApiOkResponse({
    description: 'Saved Wh with orders',
    type: SavedWarehouseResponseDto,
  })
  @Patch('/:warehouseId/orders/:orderId')
  async updateOrder(
    @Param('warehouseId') warehouseId: string,
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<SavedWarehouseResponseDto> {
    const wh = await this.updateOrderInteractor.execute({
      warehouseId,
      orderId,
      isValid: updateOrderDto.isValid,
    });
    return SavedWarehouseResponseDto.fromDomain(wh);
  }
}

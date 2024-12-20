import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AddOrderInPort } from '../domain/ports/in/add-order.in-port';
import { CreateWarehouseInPort } from '../domain/ports/in/create-warehouse.in-port';
import { UpdateOrderInPort } from '../domain/ports/in/update-order.in-port';
import { AddOrderDto } from './dtos/add-order.dto';
import { CreateWarehouseDto } from './dtos/create-warehouse.dto';
import { SavedWarehouseResponseDto } from './dtos/response/saved-warehouse.response-dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { config } from 'src/config';
import { ExtendOrderPeriodEvent } from '../domain/events/extend-order-period.event';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

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
  @Post('/:warehouseId/orders')
  async addOrderToWh(
    @Param('warehouseId') warehouseId: string,
    @Body() addOrderToWhDto: AddOrderDto,
  ): Promise<SavedWarehouseResponseDto> {
    const wh = await this.addOrderInteractor.execute({
      warehouseId,
      ...addOrderToWhDto,
    });
    return SavedWarehouseResponseDto.fromDomain(wh);
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

  @RabbitSubscribe({
    exchange: config().rabbitmq.exchange,
    routingKey: config().topics.extendOrderPeriod,
    queue: config().topics.extendOrderPeriod,
  })
  async applyExtendOrderPeriod(event: ExtendOrderPeriodEvent): Promise<void> {
    await this.updateOrderInteractor.execute({
      orderId: event.payload.orderId,
      warehouseId: event.payload.warehouseId,
      isValid: false,
    });
  }
}

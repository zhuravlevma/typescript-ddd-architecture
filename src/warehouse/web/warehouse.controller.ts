import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UpdateOrderStatusUseCase } from '../domain/ports/in/update-order-status.use-case';
import { AddOrderUseCase } from '../domain/ports/in/add-order.use-case';
import { CreateWarehouseUseCase } from '../domain/ports/in/create-warehouse.use-case';
import { WarehouseEntity } from '../domain/entities/warehouse.entity';
import { CreateWarehouseNestDto } from './dtos/create-warehouse.dto';
import { AddOrderNestDto } from './dtos/add-order.dto';
import { UpdateOrderStatusNestDto } from './dtos/update-order-status.dto';

@Controller('warehouses')
export class WarehouseController {
  constructor(
    private readonly addOrderInteractor: AddOrderUseCase,
    private readonly createWarehouseInteractor: CreateWarehouseUseCase,
    private readonly updateOrderStatusInteractor: UpdateOrderStatusUseCase,
  ) {}
  @Post('/')
  createWarehouse(
    @Body() createWarehouseDto: CreateWarehouseNestDto,
  ): Promise<WarehouseEntity> {
    return this.createWarehouseInteractor.execute(createWarehouseDto);
  }

  @Post('/:warehouseId/orders')
  addOrderToWh(
    @Param('warehouseId') warehouseId: string,
    @Body() addOrderToWhDto: AddOrderNestDto,
  ): Promise<WarehouseEntity> {
    return this.addOrderInteractor.execute({
      warehouseId,
      ...addOrderToWhDto,
    });
  }

  @Patch('/:warehouseId/orders/:orderId')
  updateOrderStatus(
    @Param('warehouseId') warehouseId: string,
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusNestDto,
  ): Promise<WarehouseEntity> {
    return this.updateOrderStatusInteractor.execute({
      warehouseId,
      orderId,
      isValid: updateOrderStatusDto.isValid,
    });
  }
}

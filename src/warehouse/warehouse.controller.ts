import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateWarehouseNestDto } from './dtos/create-warehouse.dto';
import { AddOrderNestDto } from './dtos/add-order.dto';
import { UpdateOrderStatusNestDto } from './dtos/update-order-status.dto';
import { AddOrderUseCase } from './domain/ports/in/add-order.use-case';
import { CreateWarehouseUseCase } from './domain/ports/in/create-warehouse.use-case';
import { UpdateOrderStatusUseCase } from './domain/ports/in/update-order-status.use-case';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SavedWarehouseResponseDto } from './dtos/response/saved-warehouse.response-dto';

@ApiTags('warehouse')
@Controller('warehouses')
export class WarehouseController {
  constructor(
    private readonly addOrderInteractor: AddOrderUseCase,
    private readonly createWarehouseInteractor: CreateWarehouseUseCase,
    private readonly updateOrderStatusInteractor: UpdateOrderStatusUseCase,
  ) {}

  @ApiOkResponse({
    description: 'Saved Wh with orders',
    type: SavedWarehouseResponseDto,
  })
  @Post('/')
  async createWarehouse(
    @Body() createWarehouseDto: CreateWarehouseNestDto,
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
    @Body() addOrderToWhDto: AddOrderNestDto,
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
  async updateOrderStatus(
    @Param('warehouseId') warehouseId: string,
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusNestDto,
  ): Promise<SavedWarehouseResponseDto> {
    const wh = await this.updateOrderStatusInteractor.execute({
      warehouseId,
      orderId,
      isValid: updateOrderStatusDto.isValid,
    });
    return SavedWarehouseResponseDto.fromDomain(wh);
  }
}

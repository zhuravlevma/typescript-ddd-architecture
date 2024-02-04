import { ApiProperty } from '@nestjs/swagger';
import { WarehouseEntity } from 'src/warehouse/order-management/warehouse/domain/entities/warehouse.entity';

class SavedOrderResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  isValid: boolean;
}

export class SavedWarehouseResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ isArray: true, type: SavedOrderResponseDto })
  orders: SavedOrderResponseDto[];

  static fromDomain(
    warehouseEntity: WarehouseEntity,
  ): SavedWarehouseResponseDto {
    const respDto = new SavedWarehouseResponseDto();
    const warehouseReadonly = warehouseEntity.export();
    respDto.id = warehouseReadonly.id;
    respDto.name = warehouseReadonly.name;
    respDto.orders = warehouseReadonly.orders.map((orderEntity) => {
      const orderDto = new SavedOrderResponseDto();
      const orderReadonly = orderEntity.export();
      orderDto.id = orderReadonly.id;
      orderDto.name = orderReadonly.name;
      orderDto.isValid = orderReadonly.isValid;
      return orderDto;
    });
    return respDto;
  }
}

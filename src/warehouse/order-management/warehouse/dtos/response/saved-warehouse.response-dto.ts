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
    respDto.id = warehouseEntity.id;
    respDto.name = warehouseEntity.name;
    respDto.orders = warehouseEntity.orders.map((orderEntity) => {
      const orderDto = new SavedOrderResponseDto();
      orderDto.id = orderEntity.id;
      orderDto.name = orderEntity.name;
      orderDto.isValid = orderEntity.isValid;
      return orderDto;
    });
    return respDto;
  }
}

import { WarehouseEntity } from '../../entities/warehouse.entity';

export interface UpdateOrderStatusDto {
  warehouseId: string;
  orderId: string;
  isValid: boolean;
}

export abstract class UpdateOrderStatusUseCase {
  abstract execute(
    updateOrderStatus: UpdateOrderStatusDto,
  ): Promise<WarehouseEntity>;
}

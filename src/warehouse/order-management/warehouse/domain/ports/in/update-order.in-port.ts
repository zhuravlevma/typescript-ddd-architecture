import { WarehouseEntity } from '../../entities/warehouse.entity';

export interface UpdateOrderCommand {
  warehouseId: string;
  orderId: string;
  isValid: boolean;
}

export abstract class UpdateOrderInPort {
  abstract execute(
    updateOrderStatusCommand: UpdateOrderCommand,
  ): Promise<WarehouseEntity>;
}

import { WarehouseEntity } from '../../entities/warehouse.entity';

export interface UpdateOrderParams {
  warehouseId: string;
  orderId: string;
  isValid: boolean;
}

export abstract class UpdateOrderInPort {
  abstract execute(updateOrderStatusCommand: UpdateOrderParams): Promise<WarehouseEntity>;
}

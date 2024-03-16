import { WarehouseEntity } from '../../entities/warehouse.entity';

export interface AddOrderParams {
  warehouseId: string;
  name: string;
  orderId: string;
  isValid: boolean;
}

export abstract class AddOrderInPort {
  abstract execute(addOrderCommand: AddOrderParams): Promise<WarehouseEntity>;
}

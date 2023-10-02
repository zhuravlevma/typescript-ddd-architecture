import { WarehouseEntity } from '../../entities/warehouse.entity';

export interface AddOrderCommand {
  warehouseId: string;
  name: string;
  orderId: string;
  isValid: boolean;
}

export abstract class AddOrderInPort {
  abstract execute(addOrderCommand: AddOrderCommand): Promise<WarehouseEntity>;
}

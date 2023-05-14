import { WarehouseEntity } from '../../entities/warehouse.entity';

export abstract class UpdateOrderPort {
  abstract updateOrder(warehouse: WarehouseEntity): Promise<WarehouseEntity>;
}

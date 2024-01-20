import { WarehouseEntity } from '../../entities/warehouse.entity';

export abstract class SaveWarehouseOutPort {
  abstract saveWarehouse(warehouse: WarehouseEntity): Promise<WarehouseEntity>;
}

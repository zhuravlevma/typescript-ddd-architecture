import { WarehouseEntity } from '../../entities/warehouse.entity';

export abstract class SaveWarehousePort {
  abstract saveWarehouse(warehouse: WarehouseEntity): Promise<WarehouseEntity>;
}

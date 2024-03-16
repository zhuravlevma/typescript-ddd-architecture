import { WarehouseEntity } from '../../entities/warehouse.entity';

export abstract class GetWarehouseWithOrdersOutPort {
  abstract getWarehouseWithOrders(
    warehouseId: string,
  ): Promise<WarehouseEntity>;
}

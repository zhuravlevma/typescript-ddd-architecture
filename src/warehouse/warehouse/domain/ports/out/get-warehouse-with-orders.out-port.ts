import { WarehouseEntity } from '../../entities/warehouse.entity';

export abstract class GetWarehouseWithOrdersOutPort {
  abstract getWarehouseWithOrdersPort(
    warehouseId: string,
  ): Promise<WarehouseEntity>;
}

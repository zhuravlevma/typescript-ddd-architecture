import { WarehouseEntity } from '../../entities/warehouse.entity';

export abstract class GetWarehouseWithOrdersPort {
  abstract getWarehouseWithOrdersPort(
    warehouseId: string,
  ): Promise<WarehouseEntity>;
}

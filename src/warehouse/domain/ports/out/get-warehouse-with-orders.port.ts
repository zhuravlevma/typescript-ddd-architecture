import { WarehouseEntity } from '../../entities/warehouse.entity';

export abstract class GetWarehouseWithOrdersPort {
  abstract getWarehouseWithOrderPort(
    warehouseId: string,
  ): Promise<WarehouseEntity>;
}

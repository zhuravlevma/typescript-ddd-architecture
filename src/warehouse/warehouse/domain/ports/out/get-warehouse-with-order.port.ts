import { WarehouseEntity } from '../../entities/warehouse.entity';

export abstract class GetWarehouseWithOrderPort {
  abstract getWarehouseWithOrderPort(
    warehouseId: string,
    orderId: string,
  ): Promise<WarehouseEntity>;
}

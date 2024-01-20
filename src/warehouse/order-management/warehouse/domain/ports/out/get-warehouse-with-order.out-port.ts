import { WarehouseEntity } from '../../entities/warehouse.entity';

export abstract class GetWarehouseWithOrderOutPort {
  abstract getWarehouseWithOrderPort(
    warehouseId: string,
    orderId: string,
  ): Promise<WarehouseEntity>;
}

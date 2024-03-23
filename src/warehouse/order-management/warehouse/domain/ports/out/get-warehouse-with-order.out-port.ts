import { WarehouseEntity } from '../../entities/warehouse.entity';

export abstract class GetWarehouseWithOrderOutPort {
  abstract getWarehouseWithOrder(warehouseId: string, orderId: string): Promise<WarehouseEntity>;
}

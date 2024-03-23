import { WarehouseEntity } from '../entities/warehouse.entity';
import { UpdateOrderInPort, UpdateOrderParams } from '../ports/in/update-order.in-port';
import { GetWarehouseWithOrderOutPort } from '../ports/out/get-warehouse-with-order.out-port';
import { SaveWarehouseOutPort } from '../ports/out/save-warehouse.out-port';

export class UpdateOrderInteractor implements UpdateOrderInPort {
  constructor(
    private readonly getWarehouseWithOrderPort: GetWarehouseWithOrderOutPort,
    private readonly saveWhPort: SaveWarehouseOutPort,
  ) {}
  async execute(updateOrderStatusParams: UpdateOrderParams): Promise<WarehouseEntity> {
    const warehouse = await this.getWarehouseWithOrderPort.getWarehouseWithOrder(
      updateOrderStatusParams.warehouseId,
      updateOrderStatusParams.orderId,
    );

    if (updateOrderStatusParams.isValid === true) {
      warehouse.changeOrderStatusToValid(updateOrderStatusParams.orderId);
    }

    return this.saveWhPort.saveWarehouse(warehouse);
  }
}

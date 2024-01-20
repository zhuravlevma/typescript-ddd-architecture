import { WarehouseEntity } from '../entities/warehouse.entity';
import {
  UpdateOrderInPort,
  UpdateOrderCommand,
} from '../ports/in/update-order.in-port';
import { GetWarehouseWithOrderOutPort } from '../ports/out/get-warehouse-with-order.out-port';
import { SaveWarehouseOutPort } from '../ports/out/save-warehouse.out-port';

export class UpdateOrderInteractor implements UpdateOrderInPort {
  constructor(
    private readonly getWarehouseWithOrderPort: GetWarehouseWithOrderOutPort,
    private readonly saveWhPort: SaveWarehouseOutPort,
  ) {}
  async execute(
    updateOrderStatusCommand: UpdateOrderCommand,
  ): Promise<WarehouseEntity> {
    const warehouse =
      await this.getWarehouseWithOrderPort.getWarehouseWithOrderPort(
        updateOrderStatusCommand.warehouseId,
        updateOrderStatusCommand.orderId,
      );

    if (updateOrderStatusCommand.isValid) {
      warehouse.changeOrderStatusToValid(updateOrderStatusCommand.orderId);
    }

    return this.saveWhPort.saveWarehouse(warehouse);
  }
}

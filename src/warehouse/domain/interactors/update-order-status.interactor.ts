import { WarehouseEntity } from '../entities/warehouse.entity';
import {
  UpdateOrderStatusUseCase,
  UpdateOrderStatusDto,
} from '../ports/in/update-order-status.use-case';
import { GetWarehouseWithOrderPort } from '../ports/out/get-warehouse-with-order.port';
import { GetWarehouseWithOrdersPort } from '../ports/out/get-warehouse-with-orders.port';
import { SaveWarehousePort } from '../ports/out/save-warehouse.port';

export class UpdateOrderStatusInteractor implements UpdateOrderStatusUseCase {
  constructor(
    private readonly getWarehouseWithOrderPort: GetWarehouseWithOrdersPort,
    private readonly saveWhPort: SaveWarehousePort,
  ) {}
  async execute(
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<WarehouseEntity> {
    const warehouse =
      await this.getWarehouseWithOrderPort.getWarehouseWithOrderPort(
        updateOrderStatusDto.warehouseId,
        // updateOrderStatusDto.orderId,
      );

    if (updateOrderStatusDto.isValid) {
      warehouse.changeOrderStatusToValid(updateOrderStatusDto.orderId);
    }

    console.log(warehouse);

    return this.saveWhPort.saveWarehouse(warehouse);
  }
}

import { randomUUID } from 'crypto';
import { OrderEntity } from '../entities/order.entity';
import { WarehouseEntity } from '../entities/warehouse.entity';
import {
  AddOrderCommand,
  AddOrderUseCase,
} from '../ports/in/add-order.use-case';
import { GetWarehouseWithOrdersPort } from '../ports/out/get-warehouse-with-orders.port';
import { SaveWarehousePort } from '../ports/out/save-warehouse.port';

export class AddOrderInteractor implements AddOrderUseCase {
  constructor(
    private readonly getWarehouseWithOrderPort: GetWarehouseWithOrdersPort,
    private readonly updateOrderPort: SaveWarehousePort,
  ) {}
  async execute(addOrderCommand: AddOrderCommand): Promise<WarehouseEntity> {
    const warehouse =
      await this.getWarehouseWithOrderPort.getWarehouseWithOrdersPort(
        addOrderCommand.warehouseId,
      );

    warehouse.addOrder(
      new OrderEntity({
        id: randomUUID(),
        name: addOrderCommand.name,
        isValid: false,
      }),
    );

    return this.updateOrderPort.saveWarehouse(warehouse);
  }
}

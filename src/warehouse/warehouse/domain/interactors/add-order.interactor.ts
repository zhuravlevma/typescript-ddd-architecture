import { randomUUID } from 'crypto';
import { OrderEntity } from '../entities/order.entity';
import { WarehouseEntity } from '../entities/warehouse.entity';
import { AddOrderCommand, AddOrderInPort } from '../ports/in/add-order.in-port';
import { GetWarehouseWithOrdersOutPort } from '../ports/out/get-warehouse-with-orders.out-port';
import { SaveWarehouseOutPort } from '../ports/out/save-warehouse.out-port';

export class AddOrderInteractor implements AddOrderInPort {
  constructor(
    private readonly getWarehouseWithOrderPort: GetWarehouseWithOrdersOutPort,
    private readonly updateOrderPort: SaveWarehouseOutPort,
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

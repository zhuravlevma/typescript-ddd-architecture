import { OrderEntity } from '../entities/order.entity';
import { WarehouseEntity } from '../entities/warehouse.entity';
import { AddOrderDto, AddOrderUseCase } from '../ports/in/add-order.use-case';
import { GetWarehouseWithOrdersPort } from '../ports/out/get-warehouse-with-orders.port';
import { SaveWarehousePort } from '../ports/out/save-warehouse.port';
import { v4 as uuid } from 'uuid';

export class AddOrderInteractor implements AddOrderUseCase {
  constructor(
    private readonly getWarehouseWithOrderPort: GetWarehouseWithOrdersPort,
    private readonly updateOrderPort: SaveWarehousePort,
  ) {}
  async execute(addOrderDto: AddOrderDto): Promise<WarehouseEntity> {
    const warehouse =
      await this.getWarehouseWithOrderPort.getWarehouseWithOrderPort(
        addOrderDto.warehouseId,
      );

    warehouse.addOrder(
      new OrderEntity({
        id: uuid(),
        name: addOrderDto.name,
        isValid: false,
      }),
    );

    console.log(warehouse);

    return this.updateOrderPort.saveWarehouse(warehouse);
  }
}

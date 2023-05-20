import { OrderEntity } from '../domain/entities/order.entity';
import { WarehouseEntity } from '../domain/entities/warehouse.entity';
import { OrderOrmEntity } from './orm-entities/order.orm-entity';
import { WarehouseOrmEntity } from './orm-entities/warehouse.orm-entity';

export class WarehouseMapper {
  static mapToORM(warehouseEntity: WarehouseEntity): WarehouseOrmEntity {
    const orm = new WarehouseOrmEntity();
    orm.id = warehouseEntity.id;
    orm.name = warehouseEntity.name;
    orm.orders = warehouseEntity.orders.map((orderEntity) => {
      const orderOrm = new OrderOrmEntity();
      orderOrm.id = orderEntity.id;
      orderOrm.name = orderEntity.name;
      orderOrm.warehouseId = warehouseEntity.id;
      orderOrm.isValid = orderEntity.isValid;
      return orderOrm;
    });
    return orm;
  }

  static mapToDomain(warehouseOrm: WarehouseOrmEntity): WarehouseEntity {
    return new WarehouseEntity({
      id: warehouseOrm.id,
      name: warehouseOrm.name,
      orders: warehouseOrm.orders.map(
        (orderOrm) =>
          new OrderEntity({
            id: orderOrm.id,
            name: orderOrm.name,
            isValid: orderOrm.isValid,
          }),
      ),
    });
  }
}

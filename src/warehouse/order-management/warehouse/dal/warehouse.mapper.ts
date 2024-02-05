import { OrderEntity } from '../domain/entities/order.entity';
import { WarehouseEntity } from '../domain/entities/warehouse.entity';
import { OrderOrmEntity } from './orm-entities/order.orm-entity';
import { WarehouseOrmEntity } from './orm-entities/warehouse.orm-entity';

export class WarehouseMapper {
  static mapToORM(warehouseEntity: WarehouseEntity): WarehouseOrmEntity {
    const orm = new WarehouseOrmEntity();
    const warehouseReadonly = warehouseEntity.export();
    orm.id = warehouseReadonly.id;
    orm.name = warehouseReadonly.name;
    orm.orders = warehouseReadonly.orders.map((orderEntity) => {
      const orderOrm = new OrderOrmEntity();
      const orderReadonly = orderEntity.export();
      orderOrm.id = orderReadonly.id;
      orderOrm.name = orderReadonly.name;
      orderOrm.warehouseId = warehouseReadonly.id;
      orderOrm.isValid = orderReadonly.isValid;
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

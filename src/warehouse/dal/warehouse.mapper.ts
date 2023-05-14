import { WarehouseEntity } from '../domain/entities/warehouse.entity';
import { WarehouseOrmEntity } from './orm-entities/warehouse.orm-entity';

export class WarehouseMapper {
  static mapToORM(warehouseEntity: WarehouseEntity): WarehouseOrmEntity {
    const orm = new WarehouseOrmEntity();
    orm.id = warehouseEntity.id;
    orm.name = warehouseEntity.name;
    return orm;
  }

  static mapToDomain(warehouseOrm: WarehouseOrmEntity): WarehouseEntity {
    return new WarehouseEntity({
      id: warehouseOrm.id,
      name: warehouseOrm.name,
      orders: [],
    });
  }
}

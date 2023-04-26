import { OrderEntity } from 'src/delivery/domain/deliveryman/entities/order.entity';
import { OrderOrmEntity } from '../orm-entities/orders.orm-entity';

export class AccountingOrderMapper {
  static mapToDomain(orderOrmEntity: OrderOrmEntity) {
    return new OrderEntity(
      orderOrmEntity.id,
      orderOrmEntity.name,
      orderOrmEntity.description,
      orderOrmEntity.isActive,
      orderOrmEntity.deliverymanId,
    );
  }
  static mapToOrm(orderEntity: OrderEntity) {
    const orderOrmEntity = new OrderOrmEntity();
    orderOrmEntity.deliverymanId = orderEntity.deliverymanId;
    orderOrmEntity.description = orderEntity.description;
    orderOrmEntity.name = orderEntity.name;
    orderOrmEntity.isActive = orderEntity.isActive;
    orderOrmEntity.id = orderEntity.id;
    return orderOrmEntity;
  }
}

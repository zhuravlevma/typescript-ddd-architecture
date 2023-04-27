import { OrderOrmEntity } from '../orm-entities/orders.orm-entity';
import { AccountingOrderEntity } from 'src/delivery/domain/accounting-order/entities/accounting-order.entity';

export class AccountingOrderMapper {
  static mapToDomain(orderOrmEntity: OrderOrmEntity) {
    return new AccountingOrderEntity(
      orderOrmEntity.id,
      orderOrmEntity.name,
      orderOrmEntity.description,
      orderOrmEntity.isActive,
      orderOrmEntity.deliverymanId,
    );
  }
  static mapToOrm(orderEntity: AccountingOrderEntity) {
    const orderOrmEntity = new OrderOrmEntity();
    orderOrmEntity.deliverymanId = orderEntity.deliverymanId;
    orderOrmEntity.description = orderEntity.description;
    orderOrmEntity.name = orderEntity.name;
    orderOrmEntity.isActive = orderEntity.isActive;
    orderOrmEntity.id = orderEntity.id;
    return orderOrmEntity;
  }
}

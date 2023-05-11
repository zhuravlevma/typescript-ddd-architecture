import { DeliverymanEntity } from 'src/deliveryman/domain/entities/deliveryman.entity';
import { DeliverymanOrmEntity } from './orm-entities/deliveryman.orm-entity';
import { OrderEntity } from 'src/deliveryman/domain/entities/order.entity';
import { OrderOrmEntity } from './orm-entities/orders.orm-entity';

export class DeliverymanMapper {
  static mapToDomain(
    deliverymanOrmEntity: DeliverymanOrmEntity,
  ): DeliverymanEntity {
    return new DeliverymanEntity({
      id: deliverymanOrmEntity.id,
      firstName: deliverymanOrmEntity.firstName,
      lastName: deliverymanOrmEntity.lastName,
      isActive: deliverymanOrmEntity.isActive,
      orders: deliverymanOrmEntity.orders.map(
        (orderOrmEntity) =>
          new OrderEntity({
            id: orderOrmEntity.id,
            name: orderOrmEntity.name,
            description: orderOrmEntity.description,
            isActive: orderOrmEntity.isActive,
            deliverymanId: orderOrmEntity.deliverymanId,
          }),
      ),
    });
  }

  static mapToOrm(deliverymanEntity: DeliverymanEntity): DeliverymanOrmEntity {
    const deliverymanOrmEntity = new DeliverymanOrmEntity();
    deliverymanOrmEntity.id = deliverymanEntity.id;
    deliverymanOrmEntity.firstName = deliverymanEntity.firstName;
    deliverymanOrmEntity.isActive = deliverymanEntity.isActive;
    deliverymanOrmEntity.lastName = deliverymanEntity.lastName;
    deliverymanOrmEntity.orders = deliverymanEntity.orders.map(
      (orderEntity) => {
        const orderOrmEntity = new OrderOrmEntity();
        orderOrmEntity.deliverymanId = orderEntity.deliverymanId;
        orderOrmEntity.description = orderEntity.description;
        orderOrmEntity.name = orderEntity.name;
        orderOrmEntity.isActive = orderEntity.isActive;
        orderOrmEntity.id = orderEntity.id;
        return orderOrmEntity;
      },
    );
    return deliverymanOrmEntity;
  }
}

import { DeliverymanOrmEntity } from './orm-entities/deliveryman.orm-entity';
import { OrderOrmEntity } from './orm-entities/orders.orm-entity';
import { DeliverymanEntity } from '../domain/entities/deliveryman.entity';
import { OrderEntity } from '../domain/entities/order.entity';

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
            orderId: orderOrmEntity.orderId,
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
        orderOrmEntity.orderId = orderEntity.orderId;
        return orderOrmEntity;
      },
    );
    return deliverymanOrmEntity;
  }
}

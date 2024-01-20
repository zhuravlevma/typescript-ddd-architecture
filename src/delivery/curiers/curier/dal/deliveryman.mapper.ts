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
      email: deliverymanOrmEntity.email,
      phone: deliverymanOrmEntity.phone,
      vehicleType: deliverymanOrmEntity.vehicleType,
      workingHours: deliverymanOrmEntity.workingHours,
      rating: deliverymanOrmEntity.rating,
      deliveryCapacity: deliverymanOrmEntity.deliveryCapacity,
      specialization: deliverymanOrmEntity.specialization,
      commissionRate: deliverymanOrmEntity.commissionRate,
      paymentDetails: deliverymanOrmEntity.paymentDetails,
      orders: deliverymanOrmEntity.orders.map(
        (orderOrmEntity) =>
          new OrderEntity({
            id: orderOrmEntity.id,
            name: orderOrmEntity.name,
            description: orderOrmEntity.description,
            isActive: orderOrmEntity.isActive,
            totalSum: orderOrmEntity.totalSum,
            weight: orderOrmEntity.weight,
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
    deliverymanOrmEntity.email = deliverymanEntity.email;
    deliverymanOrmEntity.phone = deliverymanEntity.phone;
    deliverymanOrmEntity.vehicleType = deliverymanEntity.vehicleType;
    deliverymanOrmEntity.workingHours = deliverymanEntity.workingHours;

    deliverymanOrmEntity.rating = deliverymanEntity.rating;
    deliverymanOrmEntity.deliveryCapacity = deliverymanEntity.deliveryCapacity;
    deliverymanOrmEntity.specialization = deliverymanEntity.specialization;
    deliverymanOrmEntity.commissionRate = deliverymanEntity.commissionRate;
    deliverymanOrmEntity.paymentDetails = deliverymanEntity.paymentDetails;

    deliverymanOrmEntity.orders = deliverymanEntity.orders.map(
      (orderEntity) => {
        const orderOrmEntity = new OrderOrmEntity();
        orderOrmEntity.deliverymanId = orderEntity.deliverymanId;
        orderOrmEntity.description = orderEntity.description;
        orderOrmEntity.name = orderEntity.name;
        orderOrmEntity.isActive = orderEntity.isActive;
        orderOrmEntity.id = orderEntity.id;
        orderOrmEntity.totalSum = orderEntity.totalSum;
        orderOrmEntity.weight = orderEntity.weight;
        orderOrmEntity.orderId = orderEntity.orderId;
        return orderOrmEntity;
      },
    );
    return deliverymanOrmEntity;
  }
}

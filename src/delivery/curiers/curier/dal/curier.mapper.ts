import { CurierOrmEntity } from './orm-entities/curier.orm-entity';
import { OrderOrmEntity } from './orm-entities/orders.orm-entity';
import { CurierEntity } from '../domain/entities/curier.entity';
import { OrderEntity } from '../domain/entities/order.entity';

export class CurierMapper {
  static mapToDomain(curierOrmEntity: CurierOrmEntity): CurierEntity {
    return new CurierEntity({
      id: curierOrmEntity.id,
      firstName: curierOrmEntity.firstName,
      lastName: curierOrmEntity.lastName,
      isActive: curierOrmEntity.isActive,
      email: curierOrmEntity.email,
      phone: curierOrmEntity.phone,
      vehicleType: curierOrmEntity.vehicleType,
      workingHours: curierOrmEntity.workingHours,
      rating: curierOrmEntity.rating,
      deliveryCapacity: curierOrmEntity.deliveryCapacity,
      specialization: curierOrmEntity.specialization,
      commissionRate: curierOrmEntity.commissionRate,
      paymentDetails: curierOrmEntity.paymentDetails,
      orders: curierOrmEntity.orders.map(
        (orderOrmEntity) =>
          new OrderEntity({
            id: orderOrmEntity.id,
            name: orderOrmEntity.name,
            description: orderOrmEntity.description,
            isActive: orderOrmEntity.isActive,
            totalSum: orderOrmEntity.totalSum,
            weight: orderOrmEntity.weight,
            curierId: orderOrmEntity.curierId,
            orderId: orderOrmEntity.orderId,
          }),
      ),
    });
  }

  static mapToOrm(curierEntity: CurierEntity): CurierOrmEntity {
    const curierOrmEntity = new CurierOrmEntity();
    curierOrmEntity.id = curierEntity.id;
    curierOrmEntity.firstName = curierEntity.firstName;
    curierOrmEntity.isActive = curierEntity.isActive;
    curierOrmEntity.lastName = curierEntity.lastName;
    curierOrmEntity.email = curierEntity.email;
    curierOrmEntity.phone = curierEntity.phone;
    curierOrmEntity.vehicleType = curierEntity.vehicleType;
    curierOrmEntity.workingHours = curierEntity.workingHours;

    curierOrmEntity.rating = curierEntity.rating;
    curierOrmEntity.deliveryCapacity = curierEntity.deliveryCapacity;
    curierOrmEntity.specialization = curierEntity.specialization;
    curierOrmEntity.commissionRate = curierEntity.commissionRate;
    curierOrmEntity.paymentDetails = curierEntity.paymentDetails;

    curierOrmEntity.orders = curierEntity.orders.map((orderEntity) => {
      const orderOrmEntity = new OrderOrmEntity();
      orderOrmEntity.curierId = orderEntity.curierId;
      orderOrmEntity.description = orderEntity.description;
      orderOrmEntity.name = orderEntity.name;
      orderOrmEntity.isActive = orderEntity.isActive;
      orderOrmEntity.id = orderEntity.id;
      orderOrmEntity.totalSum = orderEntity.totalSum;
      orderOrmEntity.weight = orderEntity.weight;
      orderOrmEntity.orderId = orderEntity.orderId;
      return orderOrmEntity;
    });
    return curierOrmEntity;
  }
}

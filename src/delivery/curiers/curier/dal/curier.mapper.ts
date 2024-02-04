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
    const curierReadonly = curierEntity.export();
    curierOrmEntity.id = curierReadonly.id;
    curierOrmEntity.firstName = curierReadonly.firstName;
    curierOrmEntity.isActive = curierReadonly.isActive;
    curierOrmEntity.lastName = curierReadonly.lastName;
    curierOrmEntity.email = curierReadonly.email;
    curierOrmEntity.phone = curierReadonly.phone;
    curierOrmEntity.vehicleType = curierReadonly.vehicleType;
    curierOrmEntity.workingHours = curierReadonly.workingHours;

    curierOrmEntity.rating = curierReadonly.rating;
    curierOrmEntity.deliveryCapacity = curierReadonly.deliveryCapacity;
    curierOrmEntity.specialization = curierReadonly.specialization;
    curierOrmEntity.commissionRate = curierReadonly.commissionRate;
    curierOrmEntity.paymentDetails = curierReadonly.paymentDetails;

    curierOrmEntity.orders = curierReadonly.orders.map((orderEntity) => {
      const orderOrmEntity = new OrderOrmEntity();
      const orderReadonly = orderEntity.export();
      orderOrmEntity.curierId = orderReadonly.curierId;
      orderOrmEntity.description = orderReadonly.description;
      orderOrmEntity.name = orderReadonly.name;
      orderOrmEntity.isActive = orderReadonly.isActive;
      orderOrmEntity.id = orderReadonly.id;
      orderOrmEntity.totalSum = orderReadonly.totalSum;
      orderOrmEntity.weight = orderReadonly.weight;
      orderOrmEntity.orderId = orderReadonly.orderId;
      return orderOrmEntity;
    });
    return curierOrmEntity;
  }
}

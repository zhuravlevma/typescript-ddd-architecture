import { BillOfLadingPositionOrmEntity } from 'src/__typeorm__/bill-of-lading-position.orm-entity';
import { OrderOrmEntity } from 'src/__typeorm__/orders.orm-entity';
import { OrderEntity } from '../domain/entities/order.entity';
import { BillOfLadingPositionEntity } from '../domain/entities/bill-of-lading-position-accounting.entity';
import { SumObjectValue } from '../domain/object-values/sum.object-value';

export class AccountingOrderMapper {
  static mapToDomain(orderOrmEntity: OrderOrmEntity): OrderEntity {
    return new OrderEntity({
      id: orderOrmEntity.id,
      name: orderOrmEntity.name,
      description: orderOrmEntity.description,
      isActive: orderOrmEntity.isActive,
      deliverymanId: orderOrmEntity.deliverymanId,
      billOfLadingPositions: orderOrmEntity.billOfLadingPositions.map(
        (position) =>
          new BillOfLadingPositionEntity({
            id: position.id,
            name: position.name,
            count: position.count,
            code: position.code,
            weight: position.weight,
            orderId: position.orderId,
            amount: position.amount,
            isValid: position.isValid,
            sum: new SumObjectValue(position.sum, position.rate),
          }),
      ),
    });
  }
  static mapToOrm(orderEntity: OrderEntity): OrderOrmEntity {
    const orderOrmEntity = new OrderOrmEntity();
    orderOrmEntity.deliverymanId = orderEntity.deliverymanId;
    orderOrmEntity.description = orderEntity.description;
    orderOrmEntity.name = orderEntity.name;
    orderOrmEntity.isActive = orderEntity.isActive;
    orderOrmEntity.id = orderEntity.id;
    orderOrmEntity.billOfLadingPositions =
      orderEntity.billOfLadingPositions.map((postitionEntity) => {
        const positionOrmEntity = new BillOfLadingPositionOrmEntity();
        positionOrmEntity.id = postitionEntity.id;
        positionOrmEntity.name = postitionEntity.name;
        positionOrmEntity.count = postitionEntity.count;
        positionOrmEntity.code = postitionEntity.code;
        positionOrmEntity.weight = postitionEntity.weight;
        positionOrmEntity.orderId = postitionEntity.orderId;
        positionOrmEntity.amount = postitionEntity.amount;
        positionOrmEntity.isValid = postitionEntity.isValid;
        return positionOrmEntity;
      });
    return orderOrmEntity;
  }
}

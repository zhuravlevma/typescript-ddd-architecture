import { BillOfLadingPositionAccountingEntity } from 'src/domain/accounting-order/entities/bill-of-lading-position-accounting.entity';
import { OrderOrmEntity } from '../orm-entities/orders.orm-entity';
import { AccountingOrderEntity } from 'src/domain/accounting-order/entities/accounting-order.entity';
import { BillOfLadingPositionOrmEntity } from '../orm-entities/bill-of-lading-position.orm-entity';
import { SumObjectValue } from 'src/domain/accounting-order/object-values/sum.object-value';

export class AccountingOrderMapper {
  static mapToDomain(orderOrmEntity: OrderOrmEntity) {
    return new AccountingOrderEntity({
      id: orderOrmEntity.id,
      name: orderOrmEntity.name,
      description: orderOrmEntity.description,
      isActive: orderOrmEntity.isActive,
      deliverymanId: orderOrmEntity.deliverymanId,
      billOfLadingPositions: orderOrmEntity.billOfLadingPositions.map(
        (position) =>
          new BillOfLadingPositionAccountingEntity({
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
  static mapToOrm(orderEntity: AccountingOrderEntity) {
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

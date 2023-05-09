import { DeliverymanEntity } from 'src/deliveryman/domain/entities/deliveryman.entity';
import { DeliverymanOrmEntity } from '../../__typeorm/deliveryman.orm-entity';
import { OrderOrmEntity } from '../../__typeorm/orders.orm-entity';
import { OrderEntity } from 'src/deliveryman/domain/entities/order.entity';
import { BillOfLadingPositionEntity } from 'src/deliveryman/domain/entities/bill-of-lading-position.entity';
import { BillOfLadingPositionOrmEntity } from '../../__typeorm/bill-of-lading-position.orm-entity';

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
            billOfLadingPositions: orderOrmEntity.billOfLadingPositions.map(
              (positionOrm) =>
                new BillOfLadingPositionEntity(
                  positionOrm.id,
                  positionOrm.isValid,
                ),
            ),
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
        orderOrmEntity.billOfLadingPositions =
          orderEntity.billOfLadingPositions.map((positionEntity) => {
            const positionOrm = new BillOfLadingPositionOrmEntity();
            positionOrm.isValid = positionEntity.isValid;
            positionOrm.id = positionEntity.id;
            return positionOrm;
          });
        return orderOrmEntity;
      },
    );
    return deliverymanOrmEntity;
  }
}

import { DeliverymanEntity } from 'src/delivery/domain/deliveryman/entities/deliveryman.entity';
import { DeliverymanOrmEntity } from '../orm-entities/deliveryman.orm-entity';
import { OrderOrmEntity } from '../orm-entities/orders.orm-entity';
import { OrderEntity } from 'src/delivery/domain/deliveryman/entities/order.entity';
import { BillOfLadingPositionEntity } from 'src/delivery/domain/deliveryman/entities/bill-of-lading-position.entity';
import { BillOfLadingPositionOrmEntity } from '../orm-entities/bill-of-lading-position.orm-entity';

export class DeliverymanMapper {
  static mapToDomain(
    deliverymanOrmEntity: DeliverymanOrmEntity,
  ): DeliverymanEntity {
    return new DeliverymanEntity(
      deliverymanOrmEntity.id,
      deliverymanOrmEntity.firstName,
      deliverymanOrmEntity.lastName,
      deliverymanOrmEntity.isActive,
      deliverymanOrmEntity.orders.map(
        (orderOrmEntity) =>
          new OrderEntity(
            orderOrmEntity.id,
            orderOrmEntity.name,
            orderOrmEntity.description,
            orderOrmEntity.isActive,
            orderOrmEntity.deliverymanId,
            orderOrmEntity.billOfLadingPositions.map(
              (positionOrm) =>
                new BillOfLadingPositionEntity(
                  positionOrm.id,
                  positionOrm.isValid,
                ),
            ),
          ),
      ),
    );
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
          orderEntity.billOfLadingPostion.map((positionEntity) => {
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

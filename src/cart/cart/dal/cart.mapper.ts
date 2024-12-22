import { CartPositionEntity } from '../domain/entities/cart-position.entity';
import { CartEntity } from '../domain/entities/cart.entity';
import { CartPositionOrmEntity } from './orm-entities/cart-position.orm-entity';
import { CartOrmEntity } from './orm-entities/cart.orm-entity';

export class CartMapper {
  static mapToORM(cartEntity: CartEntity): CartOrmEntity {
    const orm = new CartOrmEntity();
    const cartReadonly = cartEntity.export();
    orm.id = cartReadonly.id;
    orm.orderId = cartReadonly.orderId;
    orm.positions = cartReadonly.positions.map((positionEntity) => {
      const positionOrm = new CartPositionOrmEntity();
      const positionReadonly = positionEntity.export();
      positionOrm.id = positionReadonly.id;
      positionOrm.name = positionReadonly.name;
      positionOrm.code = positionReadonly.code;
      positionOrm.cartId = cartReadonly.id;
      positionOrm.sum = positionReadonly.sum;
      return positionOrm;
    });
    return orm;
  }

  static mapToDomain(cartOrm: CartOrmEntity): CartEntity {
    return new CartEntity({
      id: cartOrm.id,
      orderId: cartOrm.orderId,
      positions: cartOrm.positions.map(
        (positionORM) =>
          new CartPositionEntity({
            id: positionORM.id,
            name: positionORM.name,
            code: positionORM.code,
            sum: positionORM.sum,
          }),
      ),
    });
  }
}

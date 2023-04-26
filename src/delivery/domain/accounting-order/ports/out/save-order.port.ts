import { OrderEntity } from 'src/delivery/domain/deliveryman/entities/order.entity';

export abstract class SaveOrderPort {
  abstract save(order: OrderEntity): Promise<OrderEntity>;
}

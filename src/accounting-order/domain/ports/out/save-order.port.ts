import { OrderEntity } from '../../entities/order.entity';

export abstract class SaveOrderPort {
  abstract save(order: OrderEntity): Promise<OrderEntity>;
}

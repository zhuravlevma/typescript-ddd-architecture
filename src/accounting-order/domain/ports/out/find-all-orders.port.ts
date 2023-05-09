import { OrderEntity } from '../../entities/order.entity';

export abstract class FindAllOrdersPort {
  abstract findAllOrders(): Promise<OrderEntity[]>;
}

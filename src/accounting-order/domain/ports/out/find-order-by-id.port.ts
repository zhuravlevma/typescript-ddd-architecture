import { OrderEntity } from '../../entities/order.entity';

export abstract class FindOrderByIdPort {
  abstract findOrderById(orderId: string): Promise<OrderEntity | null>;
}

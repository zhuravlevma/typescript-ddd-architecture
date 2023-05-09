import { OrderEntity } from '../../entities/order.entity';

export abstract class FindOrderByIdUseCase {
  abstract findOrderById(id: string): Promise<OrderEntity | null>;
}

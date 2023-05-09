import { OrderEntity } from '../../entities/order.entity';

export abstract class FindOrderByIdUseCase {
  abstract execute(id: string): Promise<OrderEntity | null>;
}

import { OrderEntity } from '../../entities/order.entity';

export abstract class FindAllOrdersUseCase {
  abstract execute(): Promise<OrderEntity[]>;
}

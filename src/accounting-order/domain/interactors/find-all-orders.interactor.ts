import { OrderEntity } from '../entities/order.entity';
import { FindAllOrdersUseCase } from '../ports/in/find-all-orders.use-case';
import { FindAllOrdersPort } from '../ports/out/find-all-orders.port';

export class FindAllOrdersInteractor implements FindAllOrdersUseCase {
  constructor(private findAllOrdersPort: FindAllOrdersPort) {}

  execute(): Promise<OrderEntity[]> {
    return this.findAllOrdersPort.findAllOrders();
  }
}

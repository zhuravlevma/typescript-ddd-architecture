import { OrderEntity } from '../../entities/order.entity';

export interface UpdateOrderDto {
  orderId: string;
  isActive?: boolean;
  description: string;
}

export abstract class UpdateOrderUseCase {
  abstract execute(updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
}

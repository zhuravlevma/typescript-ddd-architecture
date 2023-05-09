import { OrderEntity } from '../../entities/order.entity';

export interface UpdateOrderDto {
  isActive?: boolean;
  description: string;
}

export abstract class UpdateOrderUseCase {
  abstract execute(
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity>;
}

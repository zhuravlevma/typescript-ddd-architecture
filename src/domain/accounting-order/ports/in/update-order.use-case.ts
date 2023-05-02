import { AccountingOrderEntity } from '../../entities/accounting-order.entity';

export interface UpdateOrderDto {
  isActive?: boolean;
  description: string;
}

export abstract class UpdateOrderUseCase {
  abstract updateOrder(
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<AccountingOrderEntity>;
}

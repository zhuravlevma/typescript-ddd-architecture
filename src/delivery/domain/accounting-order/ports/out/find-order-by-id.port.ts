import { AccountingOrderEntity } from '../../entities/accounting-order.entity';

export abstract class FindOrderByIdPort {
  abstract findOrderById(
    orderId: string,
  ): Promise<AccountingOrderEntity | null>;
}

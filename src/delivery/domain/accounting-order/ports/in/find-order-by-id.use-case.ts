import { AccountingOrderEntity } from '../../entities/accounting-order.entity';

export abstract class FindOrderByIdUseCase {
  abstract findOrderById(id: string): Promise<AccountingOrderEntity | null>;
}

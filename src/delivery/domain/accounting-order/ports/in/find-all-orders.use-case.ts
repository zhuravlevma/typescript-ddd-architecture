import { AccountingOrderEntity } from '../../entities/accounting-order.entity';

export abstract class FindAllOrdersUseCase {
  abstract findAll(): Promise<AccountingOrderEntity[]>;
}

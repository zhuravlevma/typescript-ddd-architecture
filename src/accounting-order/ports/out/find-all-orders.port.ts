import { AccountingOrderEntity } from '../../entities/accounting-order.entity';

export abstract class FindAllOrdersPort {
  abstract findAllOrders(): Promise<AccountingOrderEntity[]>;
}

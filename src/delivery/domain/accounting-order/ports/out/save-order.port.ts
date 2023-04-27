import { AccountingOrderEntity } from '../../entities/accounting-order.entity';

export abstract class SaveOrderPort {
  abstract save(order: AccountingOrderEntity): Promise<AccountingOrderEntity>;
}

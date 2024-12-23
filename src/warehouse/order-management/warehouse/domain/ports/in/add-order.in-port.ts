import { PaymentCompletedEvent } from 'src/cart/payment/events/payment-completed.event';
import { WarehouseEntity } from '../../entities/warehouse.entity';

export abstract class AddOrderInPort {
  abstract execute(event: PaymentCompletedEvent): Promise<WarehouseEntity>;
}

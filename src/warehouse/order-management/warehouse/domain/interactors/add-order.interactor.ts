import { WarehouseEntity } from '../entities/warehouse.entity';
import { AddOrderInPort } from '../ports/in/add-order.in-port';
import { SaveWarehouseOutPort } from '../ports/out/save-warehouse.out-port';
import { PaymentCompletedEvent } from 'src/cart/payment/events/payment-completed.event';
import { GetLastWhOutPort } from '../ports/out/get-last-wh.out-port';

export class AddOrderInteractor implements AddOrderInPort {
  constructor(
    private readonly saveWarehousePort: SaveWarehouseOutPort,
    private readonly getLastWhOutPort: GetLastWhOutPort,
  ) {}
  async execute(event: PaymentCompletedEvent): Promise<WarehouseEntity> {
    const nearestWh = await this.getLastWhOutPort.getLastWh();

    try {
      nearestWh.addOrder(event);
    } catch (err) {
      nearestWh.cancelOrder(event);
      console.error(err);
    }

    return this.saveWarehousePort.saveWarehouse(nearestWh);
  }
}

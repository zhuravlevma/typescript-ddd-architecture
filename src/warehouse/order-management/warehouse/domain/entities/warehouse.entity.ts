import { OrderEntity } from './order.entity';
import { OrderValidatedEvent } from '../events/order-validated.event';
import { Aggregate } from 'src/__lib__/aggregate';

interface Attributes {
  id: string;
  name: string;
  orders: OrderEntity[];
}

export class WarehouseEntity extends Aggregate<Attributes> {
  private id: string;
  private name: string;
  private orders: OrderEntity[];
  constructor(attributes: Attributes) {
    super();
    this.id = attributes.id;
    this.name = attributes.name;
    this.orders = attributes.orders;
  }

  addOrder(order: OrderEntity) {
    if (this.orders.length > 500) {
      throw new Error('Limit 500');
    }
    this.orders.push(order);
  }

  extendPeriodForOrder(orderId: string) {
    const order = this.orders.find((el) => el.Id === orderId);
    order.changeStatus(false);
  }

  changeOrderStatusToValid(orderId: string) {
    const order = this.orders.find((el) => el.Id === orderId);
    order.changeStatus(true);

    this.addMessage(
      new OrderValidatedEvent({
        aggregateId: this.id,
        payload: {
          orderId: order.Id,
        },
      }),
      // {
      //   compensation: new ExtendOrderPeriodEvent({
      //     aggregateId: this.id,
      //     payload: {
      //       orderId: orderId,
      //       warehouseId: this.id,
      //     },
      //   }),
      // },
    );
  }
}

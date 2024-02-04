import { OrderEntity } from './order.entity';
import { OrderValidatedEvent } from '../events/order-validated.event';
import { DomainMessage } from 'src/__lib__/domain-message';

interface Attributes {
  id: string;
  name: string;
  orders: OrderEntity[];
}

export class WarehouseEntity implements Attributes {
  id: string;
  name: string;
  orders: OrderEntity[];
  events: DomainMessage[];

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.orders = attributes.orders;
    this.events = [];
  }

  addOrder(order: OrderEntity) {
    this.orders.push(order);
  }

  changeOrderStatusToValid(orderId: string) {
    const order = this.orders.find((el) => el.id === orderId);
    order.changeStatus(true);

    console.log('add event');

    this.events.push(
      new OrderValidatedEvent({
        aggregateId: this.id,
        correlationId: 'requestId',
        payload: {
          orderId: order.id,
        },
      }),
    );
  }
}

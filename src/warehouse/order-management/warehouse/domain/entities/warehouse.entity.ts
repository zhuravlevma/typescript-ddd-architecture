import { OrderEntity } from './order.entity';
import { OrderValidatedEvent } from '../events/order-validated.event';
import { Aggregate } from 'src/__lib__/aggregate';

interface Attributes {
  id: string;
  name: string;
  orders: OrderEntity[];
}

export class WarehouseEntity extends Aggregate<Attributes> {
  constructor(attributes: Attributes) {
    super(attributes);
  }

  addOrder(order: OrderEntity) {
    this.__data.orders.push(order);
  }

  changeOrderStatusToValid(orderId: string) {
    const order = this.__data.orders.find((el) => el.id === orderId);
    order.changeStatus(true);

    this.addMessage(
      new OrderValidatedEvent({
        aggregateId: this.__data.id,
        correlationId: 'requestId',
        payload: {
          orderId: order.id,
        },
      }),
    );
  }
}

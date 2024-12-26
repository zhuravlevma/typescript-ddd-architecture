import { OrderEntity } from './order.entity';
import { OrderValidatedEvent } from '../events/order-validated.event';
import { Aggregate } from 'src/__lib__/aggregate';
import { SagaCompensationEvent } from 'src/__saga__/saga-compensation.event';
import { DomainMessage } from 'src/__lib__/domain-message';
import { SagaCompletedEvent } from 'src/__saga__/saga-completed.event';
import { PaymentCompletedEvent } from 'src/cart/payment/events/payment-completed.event';

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

  addOrder(event: PaymentCompletedEvent) {
    // if (this.orders.length > 500) {
    throw new Error('Limit 500');
    // }

    this.orders.push(
      new OrderEntity({
        id: event.payload.orderId,
        name: 'ha',
        isValid: false,
      }),
    );
    this.addMessage(
      new SagaCompletedEvent({
        aggregateId: this.id,
        saga: {
          correlationId: event.aggregateId,
          sagaId: event.saga.sagaId,
        },
      }),
    );
  }

  cancelOrder(event: DomainMessage) {
    this.addMessage(
      new SagaCompensationEvent({
        aggregateId: this.id,
        saga: {
          sagaId: event.saga.sagaId,
          correlationId: event.saga.correlationId,
        },
      }),
    );
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
    );
  }
}

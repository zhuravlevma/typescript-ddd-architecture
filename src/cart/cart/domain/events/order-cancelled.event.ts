import {
  DomainEvent,
  DomainMessageAttributes,
} from 'src/__lib__/domain-message';
import { config } from 'src/config';

interface OrderCancelledPayload {
  orderId: string;
}

export class OrderCancelledEvent extends DomainEvent<OrderCancelledPayload> {
  constructor(attributes: DomainMessageAttributes<OrderCancelledPayload>) {
    super({
      reason: 'The order was cancelled',
      payload: attributes.payload,
      messageName: config().topics.orderCancelled,
      aggregateId: attributes.aggregateId,
      aggregateName: 'Cart',
      contextName: 'Cart',
    });
  }
}

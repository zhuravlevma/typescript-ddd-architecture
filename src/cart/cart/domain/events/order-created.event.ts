import {
  DomainEvent,
  DomainMessageAttributes,
} from 'src/__lib__/domain-message';
import { config } from 'src/config';

interface OrderCreatedPayload {
  orderId: string;
  userId: string;
  positions: OrderPositionCreatedPayload[];
}

interface OrderPositionCreatedPayload {
  sum: number;
  code: number;
}

export class OrderCreatedEvent extends DomainEvent<OrderCreatedPayload> {
  constructor(attributes: DomainMessageAttributes<OrderCreatedPayload>) {
    super({
      reason: 'The order was created',
      payload: attributes.payload,
      messageName: config().topics.orderCreated,
      aggregateId: attributes.aggregateId,
      aggregateName: 'Cart',
      contextName: 'Cart',
      saga: attributes.saga,
    });
  }
}

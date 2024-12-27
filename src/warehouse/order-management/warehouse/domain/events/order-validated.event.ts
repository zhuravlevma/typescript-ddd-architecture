import {
  DomainEvent,
  DomainMessageAttributes,
} from 'src/__lib__/domain-message';
import { config } from 'src/config';

interface OrderValidatedPayload {
  orderId: string;
}

export class OrderValidatedEvent extends DomainEvent<OrderValidatedPayload> {
  constructor(attributes: DomainMessageAttributes<OrderValidatedPayload>) {
    super({
      reason: 'The order was validated',
      payload: attributes.payload,
      messageName: config().topics.orderValidated,
      aggregateId: attributes.aggregateId,
      aggregateName: 'Warehouse',
      contextName: 'warehouse',
      saga: attributes.saga,
    });
  }
}

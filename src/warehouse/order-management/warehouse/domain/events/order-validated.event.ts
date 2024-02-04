import {
  DomainEvent,
  DomainMessageAttributes,
} from 'src/__relay__/domain-message';

interface OrderValidatedPayload {
  orderId: string;
}

export class OrderValidatedEvent extends DomainEvent<OrderValidatedPayload> {
  constructor(attributes: DomainMessageAttributes<OrderValidatedPayload>) {
    super({
      reason: 'The order was validated',
      payload: attributes.payload,
      messageName: 'order-validated',
      aggregateId: attributes.aggregateId,
      aggregateName: 'Warehouse',
      contextName: 'warehouse',
      correlationId: attributes.correlationId,
    });
  }
}

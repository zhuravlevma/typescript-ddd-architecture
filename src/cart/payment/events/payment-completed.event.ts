import {
  DomainEvent,
  DomainMessageAttributes,
} from 'src/__lib__/domain-message';
import { config } from 'src/config';

interface OrderPositionCreatedPayload {
  sum: number;
  code: number;
}

interface PaymentCompletedPayload {
  paymentId: string;
  orderId: string;
  positions: OrderPositionCreatedPayload[];
}

export class PaymentCompletedEvent extends DomainEvent<PaymentCompletedPayload> {
  constructor(attributes: DomainMessageAttributes<PaymentCompletedPayload>) {
    super({
      reason: 'The payment was completed',
      payload: attributes.payload,
      messageName: config().topics.paymentCompleted,
      aggregateId: attributes.aggregateId,
      aggregateName: 'Payment',
      contextName: 'Cart',
      saga: attributes.saga,
    });
  }
}

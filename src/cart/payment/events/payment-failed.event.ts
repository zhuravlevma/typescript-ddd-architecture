import {
  DomainEvent,
  DomainMessageAttributes,
} from 'src/__lib__/domain-message';
import { config } from 'src/config';

interface PaymentFailedPayload {
  paymentId: string;
}

export class PaymentFailedEvent extends DomainEvent<PaymentFailedPayload> {
  constructor(attributes: DomainMessageAttributes<PaymentFailedPayload>) {
    super({
      reason: 'The payment was failed',
      payload: attributes.payload,
      messageName: config().topics.paymentFailed,
      aggregateId: attributes.aggregateId,
      aggregateName: 'Cart',
      contextName: 'Cart',
      saga: attributes.saga,
    });
  }
}

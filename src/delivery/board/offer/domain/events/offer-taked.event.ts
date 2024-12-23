import {
  DomainEvent,
  DomainMessageAttributes,
} from 'src/__lib__/domain-message';
import { config } from 'src/config';

interface OfferTakedPayload {
  orderId: string;
  curierId: string;
}

export class OfferTakedEvent extends DomainEvent<OfferTakedPayload> {
  constructor(attributes: DomainMessageAttributes<OfferTakedPayload>) {
    super({
      reason: 'The delivery man accepted the offer',
      payload: attributes.payload,
      messageName: config().topics.offerTaked,
      aggregateId: attributes.aggregateId,
      aggregateName: 'Offer',
      contextName: 'deivery',
      saga: attributes.saga,
    });
  }
}

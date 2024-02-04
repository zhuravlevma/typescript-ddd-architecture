import {
  DomainEvent,
  DomainMessageAttributes,
} from 'src/__lib__/domain-message';

interface OfferTakedPayload {
  orderId: string;
  curierId: string;
}

export class OfferTakedEvent extends DomainEvent<OfferTakedPayload> {
  constructor(attributes: DomainMessageAttributes<OfferTakedPayload>) {
    super({
      reason: 'The delivery man accepted the offer',
      payload: attributes.payload,
      messageName: 'offer-taked',
      aggregateId: attributes.aggregateId,
      aggregateName: 'Offer',
      contextName: 'deivery',
      correlationId: attributes.correlationId,
    });
  }
}

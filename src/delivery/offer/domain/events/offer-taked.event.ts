import { DomainEvent, DomainEventAttr } from 'src/__relay__/domain-event';

interface OfferTakedPayload {
  orderId: string;
  deliverymanId: string;
}

export class OfferTakedEvent implements DomainEvent<OfferTakedPayload> {
  type: string;
  reason: string;
  payload: OfferTakedPayload;

  constructor(attributes: DomainEventAttr<OfferTakedPayload>) {
    this.type = 'offer-taked';
    this.reason = attributes.reason;
    this.payload = attributes.payload;
  }
}

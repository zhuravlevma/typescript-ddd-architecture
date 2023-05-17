import { DomainEvent } from 'src/__relay__/domain-event';

interface OfferTakedPayload {
  orderId: string;
  deliverymanId: string;
}

export class OfferTakedEvent implements DomainEvent<OfferTakedPayload> {
  id: string;
  type: string;
  reason: string;
  payload: OfferTakedPayload;

  constructor(attributes: DomainEvent<OfferTakedPayload>) {
    this.id = attributes.id;
    this.type = attributes.type;
    this.reason = attributes.reason;
    this.payload = attributes.payload;
  }
}

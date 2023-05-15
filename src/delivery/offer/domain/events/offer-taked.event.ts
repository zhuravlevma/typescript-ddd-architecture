import { DomainEvent } from 'src/__relay__/domain-event';

export class OfferTakedEvent implements DomainEvent {
  id: string;
  type: string;
  reason: string;
  payload: Map<string, string>;

  constructor(attributes: DomainEvent) {
    this.id = attributes.id;
    this.type = attributes.type;
    this.reason = attributes.reason;
    this.payload = attributes.payload;
  }
}

import { DomainEvent } from 'src/__relay__/domain-event';
export class OrderValidatedEvent implements DomainEvent {
  id: string;
  type: string;
  reason: string;
  payload: object;

  constructor(attributes: DomainEvent) {
    this.id = attributes.id;
    this.type = attributes.type;
    this.reason = attributes.reason;
    this.payload = attributes.payload;
  }
}

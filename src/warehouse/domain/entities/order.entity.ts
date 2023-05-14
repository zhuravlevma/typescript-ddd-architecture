import { DomainEvent } from 'src/__lib__/domain-event';
import { OrderValidatedEvent } from '../events/order-validated.event';

interface Attributes {
  id: string;
  name: string;
  isValid: boolean;
}

export class OrderEntity implements Attributes {
  id: string;
  name: string;
  isValid: boolean;
  domainEvents: DomainEvent[];

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.isValid = attributes.isValid;
    this.domainEvents = [];
  }

  changeStatus(isValid: boolean) {
    this.isValid = isValid;
    if (this.isValid === true) {
      this.domainEvents.push(
        new OrderValidatedEvent({
          id: this.id,
          type: 'order-validated',
          reason: 'this order has been validate',
        }),
      );
    }
  }
}

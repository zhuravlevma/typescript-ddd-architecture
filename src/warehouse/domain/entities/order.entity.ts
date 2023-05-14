import { DomainEvent } from 'src/__relay__/domain-event';
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

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.isValid = attributes.isValid;
  }

  changeStatus(isValid: boolean) {
    this.isValid = isValid;
  }
}

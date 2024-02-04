import { DomainMessage } from './domain-message';
import { Entity } from './entity';

export abstract class Aggregate<Attributes> extends Entity<Attributes> {
  domainMessages: DomainMessage[] = [];

  constructor(attributes: Attributes) {
    super(attributes);
  }

  addMessage(message: DomainMessage) {
    this.domainMessages.push(message);
  }

  pullMessages() {
    return this.domainMessages;
  }
}

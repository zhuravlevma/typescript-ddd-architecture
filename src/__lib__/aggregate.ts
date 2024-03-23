import { DomainMessage } from './domain-message';
import { Entity } from './entity';

export abstract class Aggregate<Attributes> extends Entity<Attributes> {
  private readonly domainMessages: DomainMessage[] = [];

  addMessage(message: DomainMessage): void {
    this.domainMessages.push(message);
  }

  pullMessages(): DomainMessage[] {
    return this.domainMessages;
  }
}

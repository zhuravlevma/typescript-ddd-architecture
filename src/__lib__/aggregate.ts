import { DomainMessage } from './domain-message';
import { Entity } from './entity';

export abstract class Aggregate<Attributes> extends Entity<Attributes> {
  private readonly domainMessages: DomainMessage[] = [];

  addMessage(
    message: DomainMessage,
    params?: { compensation: DomainMessage },
  ): void {
    if (params.compensation !== undefined) {
      message.compensation = params.compensation;
    }
    this.domainMessages.push(message);
  }

  pullMessages(): DomainMessage[] {
    return this.domainMessages;
  }
}

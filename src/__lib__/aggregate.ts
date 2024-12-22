import { DomainMessage } from './domain-message';
import { Entity } from './entity';

export abstract class Aggregate<Attributes> extends Entity<Attributes> {
  private readonly domainMessages: DomainMessage[] = [];

  addMessage(
    message: DomainMessage,
    params?: {
      compensation: DomainMessage;
      sagaId: string;
      isFinal?: boolean;
      error?: boolean;
    },
  ): void {
    if (params.compensation !== undefined) {
      message.compensation = params.compensation;
      message.sagaId = params.sagaId;
    }
    if (params.isFinal !== undefined) {
      message.isFinal = params.isFinal;
    }
    this.domainMessages.push(message);
  }

  pullMessages(): DomainMessage[] {
    return this.domainMessages;
  }
}

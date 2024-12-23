import { DomainMessage } from '../__lib__/domain-message';
import { MessageOrmEntity } from './message.orm-entity';

export class OutboxMapper {
  static mapToORM<Payload>(
    event: DomainMessage<Payload>,
    correlationId: string,
  ): MessageOrmEntity {
    const orm = new MessageOrmEntity();
    orm.reason = event.reason;
    orm.messageType = event.messageType;
    orm.payload = event.payload;
    orm.aggregateId = event.aggregateId;
    orm.aggregateName = event.aggregateName;
    orm.contextName = event.contextName;
    orm.correlationId =
      event.correlationId !== undefined ? event.correlationId : correlationId;
    orm.messageName = event.messageName;
    orm.compensationEvent = event.compensation;
    orm.sagaId = event.sagaId;
    orm.isFinal = event.isFinal;

    return orm;
  }
}

import { DomainEvent, DomainMessage } from '../__lib__/domain-message';
import { MessageOrmEntity } from './message.orm-entity';

export class OutboxMapper {
  static mapToDomain(orm: MessageOrmEntity): DomainMessage {
    return new DomainEvent({
      reason: orm.reason,
      payload: orm.payload,
      messageName: orm.messageName, // name of the event or command "WarehouseCreated"(event), "AddOrder"(command)
      aggregateId: orm.aggregateId, // necessary for partitioning
      aggregateName: orm.aggregateName, // Can be often useful (for example for humans or for id prefixes)
      contextName: orm.contextName, // Can be often useful (for example for humans or for id prefixes)
      saga: {
        correlationId: orm.correlationId,
        compensation: orm.compensationEvent,
        sagaId: orm.sagaId,
        isFinal: orm.isFinal,
      },
    });
  }
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
      event.saga.correlationId !== undefined
        ? event.saga.correlationId
        : correlationId;
    orm.messageName = event.messageName;
    orm.compensationEvent = event.saga.compensation;
    orm.sagaId = event.saga.sagaId;
    orm.isFinal = event.saga.isFinal;

    return orm;
  }
}

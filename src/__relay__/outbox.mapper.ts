import { randomUUID } from 'crypto';
import { DomainEvent } from './domain-event';
import { OutboxOrmEntity } from './outbox.orm-entity';

export class OutboxMapper {
  static mapToORM<Payload>(event: DomainEvent<Payload>): OutboxOrmEntity {
    const orm = new OutboxOrmEntity();
    orm.id = randomUUID();
    orm.reason = event.reason;
    orm.type = event.type;
    orm.payload = event.payload;
    return orm;
  }
}

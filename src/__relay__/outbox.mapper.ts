import { DomainEvent } from 'src/__relay__/domain-event';
import { OutboxOrmEntity } from './outbox.orm-entity';
import { v4 as uuid } from 'uuid';

export class OutboxMapper {
  static mapToORM<Payload>(event: DomainEvent<Payload>): OutboxOrmEntity {
    const orm = new OutboxOrmEntity();
    orm.id = uuid();
    orm.reason = event.reason;
    orm.type = event.type;
    orm.payload = event.payload;
    return orm;
  }
}

import { DomainEvent } from 'src/__lib__/domain-event';
import { OutboxOrmEntity } from './outbox.orm-entity';
import { v4 as uuid } from 'uuid';

export class OutboxMapper {
  static mapToORM(event: DomainEvent): OutboxOrmEntity {
    const orm = new OutboxOrmEntity();
    orm.id = uuid();
    orm.domainId = event.id;
    orm.reason = event.reason;
    orm.type = event.type;
    return orm;
  }
}

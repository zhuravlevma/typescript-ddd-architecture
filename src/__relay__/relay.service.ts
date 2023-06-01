import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OutboxOrmEntity } from './outbox.orm-entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RelayService {
  private readonly logger = new Logger(RelayService.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    try {
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        const events = await transactionalEntityManager
          .createQueryBuilder()
          .from(OutboxOrmEntity, 'outbox')
          .where('outbox.published = :published', { published: false })
          .orderBy('outbox.created_at', 'DESC')
          .setLock('pessimistic_partial_write')
          .take(100)
          .getRawMany();

        const ids = [];

        for (const event of events) {
          ids.push(event.id);
          this.logger.debug('run publishing: ' + event.id);
          this.eventEmitter.emit(event.type, event);
        }

        if (events.length) {
          await transactionalEntityManager
            .createQueryBuilder()
            .from(OutboxOrmEntity, 'outbox')
            .delete()
            .from(OutboxOrmEntity)
            .where('id IN (:...id)', { id: ids })
            .execute();
        }
      });
    } catch (err) {
      this.logger.error('published error: ' + err.message);
    }
  }
}

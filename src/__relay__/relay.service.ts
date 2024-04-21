import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MessageOrmEntity } from './message.orm-entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { config } from 'src/config';
import {
  OFFER_TAKED_CLIENT,
  ORDER_VALIDATED_CLIENT,
  REPORT_VALIDATED_CLIENT,
} from './clients';

@Injectable()
export class RelayService {
  private readonly logger = new Logger(RelayService.name);

  constructor(
    @Inject(OFFER_TAKED_CLIENT)
    private readonly offerTakedClient: ClientProxy,
    @Inject(ORDER_VALIDATED_CLIENT)
    private readonly orderValidatedClient: ClientProxy,
    @Inject(REPORT_VALIDATED_CLIENT)
    private readonly reportValidatedClient: ClientProxy,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron(): Promise<void> {
    try {
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        const messages = await transactionalEntityManager
          .createQueryBuilder()
          .from(MessageOrmEntity, 'outbox')
          .where('outbox.published = :published', { published: false })
          .orderBy('outbox.created_at', 'DESC')
          .setLock('pessimistic_partial_write')
          .take(100)
          .getRawMany();

        const ids = [];

        for (const event of messages) {
          ids.push(event.id);
          this.logger.debug('run publishing: ' + event.id);

          if (event.message_name === config().topics.offerTaked) {
            this.offerTakedClient
              .emit(config().topics.offerTaked, event)
              .subscribe();
          }
          if (event.message_name === config().topics.orderValidated) {
            this.orderValidatedClient
              .emit(config().topics.orderValidated, event)
              .subscribe();
          }
          if (event.message_name === config().topics.reportValidated) {
            this.reportValidatedClient
              .emit(config().topics.reportValidated, event)
              .subscribe();
          }
        }

        if (messages.length) {
          await transactionalEntityManager
            .createQueryBuilder()
            .from(MessageOrmEntity, 'outbox')
            .delete()
            .from(MessageOrmEntity)
            .where('id IN (:...id)', { id: ids })
            .execute();
        }
      });
    } catch (err) {
      this.logger.error('published error: ' + err.message);
    }
  }
}

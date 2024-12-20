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
  SAGA_CLIENT,
} from './clients';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RelayService {
  private readonly logger = new Logger(RelayService.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly amqpConnection: AmqpConnection,
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

          if (event.compensation_event !== undefined) {
            await this.amqpConnection.publish(
              'test',
              config().topics.sagaReceived,
              event,
            );
          }

          if (event.message_name === config().topics.offerTaked) {
            await this.amqpConnection.publish(
              'test',
              config().topics.offerTaked,
              event,
            );
          }
          if (event.message_name === config().topics.orderValidated) {
            await this.amqpConnection.publish(
              'test',
              config().topics.orderValidated,
              event,
            );
          }
          if (event.message_name === config().topics.reportValidated) {
            await this.amqpConnection.publish(
              'test',
              config().topics.reportValidated,
              event,
            );
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

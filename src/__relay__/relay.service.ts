import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MessageOrmEntity } from './message.orm-entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { config } from 'src/config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { OutboxMapper } from './outbox.mapper';

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
          .createQueryBuilder(MessageOrmEntity, 'outbox')
          .where('outbox.published = :published', { published: false })
          .orderBy('outbox.created_at', 'DESC')
          .setLock('pessimistic_partial_write')
          .take(100)
          .getMany();

        const ids = [];

        for (const event of messages) {
          const domainEvent = OutboxMapper.mapToDomain(event);
          ids.push(event.id);

          if (event.sagaId !== null) {
            this.logger.debug('run publishing to saga: ' + event.id);

            // await this.amqpConnection.publish(
            //   config().rabbitmq.exchange,
            //   config().topics.sagaReceived,
            //   event,
            // );
          }

          this.logger.debug('run publishing: ' + event.id);

          if (domainEvent.messageName === config().topics.offerTaked) {
            await this.amqpConnection.publish(
              config().rabbitmq.exchange,
              config().topics.offerTaked,
              domainEvent,
            );
          }
          if (domainEvent.messageName === config().topics.orderValidated) {
            await this.amqpConnection.publish(
              config().rabbitmq.exchange,
              config().topics.orderValidated,
              domainEvent,
            );
          }
          if (domainEvent.messageName === config().topics.reportValidated) {
            await this.amqpConnection.publish(
              config().rabbitmq.exchange,
              config().topics.reportValidated,
              domainEvent,
            );
          }

          if (domainEvent.messageName === config().topics.orderCreated) {
            await this.amqpConnection.publish(
              config().rabbitmq.exchange,
              config().topics.orderCreated,
              domainEvent,
            );
          }

          if (domainEvent.messageName === config().topics.paymentCompleted) {
            await this.amqpConnection.publish(
              config().rabbitmq.exchange,
              config().topics.paymentCompleted,
              domainEvent,
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

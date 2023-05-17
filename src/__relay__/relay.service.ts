import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OutboxOrmEntity } from './outbox.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(OutboxOrmEntity)
    private outBoxRepository: Repository<OutboxOrmEntity>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const events = await this.outBoxRepository.find({
      where: { publushed: false },
      take: 5,
    });

    for (const event of events) {
      try {
        this.logger.debug('run publishing: ' + event.id);
        this.eventEmitter.emit(event.type, event);
        await this.outBoxRepository.remove(event);
      } catch (err) {
        this.logger.error('published error: ' + err.message);
      }
    }
  }
}

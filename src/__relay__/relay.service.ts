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
    });

    console.log(events);

    events.forEach((event) => {
      this.eventEmitter.emit(event.type, event);
    });

    await this.outBoxRepository.remove(events);

    this.logger.debug('Called when the current second is 10');
  }
}

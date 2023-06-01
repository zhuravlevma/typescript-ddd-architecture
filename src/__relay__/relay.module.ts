import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboxOrmEntity } from './outbox.orm-entity';
import { RelayService } from './relay.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([OutboxOrmEntity]),
  ],
  controllers: [],
  providers: [RelayService],
})
export class RelayModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageOrmEntity } from './message.orm-entity';
import { RelayService } from './relay.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([MessageOrmEntity]),
  ],
  controllers: [],
  providers: [RelayService],
})
export class RelayModule {}

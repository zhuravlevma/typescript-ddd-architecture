import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboxOrmEntity } from './outbox.orm-entity';
import { RelayService } from './relay.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OutboxOrmEntity]), // move to relay module
  ],
  controllers: [],
  providers: [RelayService],
})
export class RelayModule {}

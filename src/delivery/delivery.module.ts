import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { CuriersModule } from './curiers/curiers.module';
import { Tracking } from './tracking/tracking.module';

@Module({
  imports: [CuriersModule, BoardModule, Tracking],
})
export class DeliveryModule {}

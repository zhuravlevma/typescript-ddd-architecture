import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalTrackingApi } from './api/external-tracking-api';
import { TrackingController } from './controllers/tracking.controller';
import { Delivery } from './models/delivery.model';
import { TrackingService } from './services/tracking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery])],
  controllers: [TrackingController],
  providers: [TrackingService, ExternalTrackingApi],
})
export class TrackingModule {}

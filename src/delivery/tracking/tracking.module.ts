import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './models/route.model';
import { TrackingController } from './controllers/tracking.controller';
import { TrackingService } from './services/tracking.service';
import { ExternalTrackingApi } from './api/external-tracking-api';

@Module({
  imports: [TypeOrmModule.forFeature([Route])],
  controllers: [TrackingController],
  providers: [TrackingService, ExternalTrackingApi],
})
export class Tracking {}

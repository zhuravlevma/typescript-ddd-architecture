import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateDeliveryDto } from '../dtos/create-delivery.dto';
import { TrackingService } from '../services/tracking.service';
import { UpdateDeliveryDto } from '../dtos/update-delivery.dto';

@Controller('/tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}
  @Post()
  createRoute(@Body() createRouteDto: CreateDeliveryDto) {
    return this.trackingService.create(createRouteDto);
  }

  @Patch()
  updateRoute(@Body() updateRouteDto: UpdateDeliveryDto) {
    return this.trackingService.update(updateRouteDto);
  }
}

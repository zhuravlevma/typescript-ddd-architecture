import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateRouteDto } from '../dtos/create-route.dto';
import { TrackingService } from '../services/tracking.service';
import { UpdateRouteDto } from '../dtos/update-route.dto';

@Controller('/tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}
  @Post()
  createRoute(@Body() createRouteDto: CreateRouteDto) {
    return this.trackingService.create(createRouteDto);
  }

  @Patch()
  updateRoute(@Body() updateRouteDto: UpdateRouteDto) {
    return this.trackingService.update(updateRouteDto);
  }
}

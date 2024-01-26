import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from '../dtos/create-route.dto';
import { Route } from '../models/route.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalTrackingApi } from '../api/external-tracking-api';
import { UpdateRouteDto } from '../dtos/update-route.dto';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
    private readonly externalTrackingApi: ExternalTrackingApi,
  ) {}

  async create(createRouteDto: CreateRouteDto): Promise<Route> {
    const route = await this.routeRepository.save({
      orderId: createRouteDto.orderId,
      courierId: createRouteDto.courierId,
    });

    return route;
  }

  async update(updateRouteDto: UpdateRouteDto): Promise<Route> {
    const route = await this.routeRepository.findOne({
      where: {
        id: updateRouteDto.id,
      },
    });

    if (updateRouteDto.courierId) {
      route.courierId = updateRouteDto.courierId;
    }

    if (updateRouteDto.orderId) {
      route.orderId = updateRouteDto.orderId;
    }

    const newCoordinates = await this.externalTrackingApi.checkLastCoordinates({
      entityId: route.courierId,
    });

    return this.routeRepository.save({
      ...route,
      startLatitude: newCoordinates.startLatitude,
      startLongitude: newCoordinates.startLongitude,
      endLatitude: newCoordinates.endLatitude,
      endLongitude: newCoordinates.endLongitude,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from '../dtos/create-delivery.dto';
import { Delivery } from '../models/delivery.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalTrackingApi } from '../api/external-tracking-api';
import { UpdateDeliveryDto } from '../dtos/update-delivery.dto';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    private readonly externalTrackingApi: ExternalTrackingApi,
  ) {}

  async create(createRouteDto: CreateDeliveryDto): Promise<Delivery> {
    const delivery = await this.deliveryRepository.save({
      orderId: createRouteDto.orderId,
      truckId: createRouteDto.truckId,
      targetPickUpPoint: createRouteDto.targetPickUpPoint,
    });

    return delivery;
  }

  async update(updateRouteDto: UpdateDeliveryDto): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({
      where: {
        id: updateRouteDto.id,
      },
    });

    if (updateRouteDto.truckId) {
      delivery.truckId = updateRouteDto.truckId;
    }

    if (updateRouteDto.orderId) {
      delivery.orderId = updateRouteDto.orderId;
    }

    if (updateRouteDto.targetPickUpPoint) {
      delivery.targetPickUpPoint = updateRouteDto.targetPickUpPoint;
    }

    const newCoordinates = await this.externalTrackingApi.checkLastCoordinates({
      entityId: delivery.truckId,
    });

    return this.deliveryRepository.save({
      ...delivery,
      startLatitude: newCoordinates.startLatitude,
      startLongitude: newCoordinates.startLongitude,
      endLatitude: newCoordinates.endLatitude,
      endLongitude: newCoordinates.endLongitude,
    });
  }
}

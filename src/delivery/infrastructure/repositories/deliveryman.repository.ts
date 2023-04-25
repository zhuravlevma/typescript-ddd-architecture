import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Deliveryman } from '../orm-entities/deliveryman.model';

@Injectable()
export class DeliverymanRepository {
  constructor(
    @InjectRepository(Deliveryman)
    private deliveryMan: Repository<Deliveryman>,
  ) {}

  createDeliveryMan(deliveryMan: Deliveryman): Promise<Deliveryman> {
    return this.deliveryMan.save(deliveryMan);
  }

  findAllDeliveryMans(): Promise<Deliveryman[]> {
    return this.deliveryMan.find();
  }

  findDeliverymanByIdWithOrders(deliverymanId: number): Promise<Deliveryman> {
    return this.deliveryMan.findOne({
      where: {
        id: deliverymanId,
        orders: {
          isActive: true,
        },
      },
      relations: {
        orders: true,
      },
    });
  }

  save(deliveryMan: Deliveryman): Promise<Deliveryman> {
    return this.deliveryMan.save(deliveryMan);
  }
}

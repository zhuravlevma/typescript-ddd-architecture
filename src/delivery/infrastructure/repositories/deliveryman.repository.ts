import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DeliverymanOrmEntity } from '../orm-entities/deliveryman.orm-entity';
import { DeliverymanMapper } from '../mappers/deliveryman.mapper';
import { CreateDeliverymanPort } from 'src/delivery/domain/deliveryman/ports/out/create-deliveryman.port';
import { FindAllDeliverymansPort } from 'src/delivery/domain/deliveryman/ports/out/find-all-deliverymans.port';
import { FindDeliverymanByIdWithOrdersPort } from 'src/delivery/domain/deliveryman/ports/out/find-deliveryman-by-id-with-orders.port';
import { SaveDeliverymanPort } from 'src/delivery/domain/deliveryman/ports/out/save-deliveryman.port';
import { DeliverymanEntity } from 'src/delivery/domain/deliveryman/entities/deliveryman.entity';

@Injectable()
export class DeliverymanRepository
  implements
    CreateDeliverymanPort,
    FindAllDeliverymansPort,
    FindDeliverymanByIdWithOrdersPort,
    SaveDeliverymanPort
{
  constructor(
    @InjectRepository(DeliverymanOrmEntity)
    private deliveryMan: Repository<DeliverymanOrmEntity>,
  ) {}

  async createDeliveryman(
    deliveryManEntity: DeliverymanEntity,
  ): Promise<DeliverymanEntity> {
    const deliveryman = DeliverymanMapper.mapToOrm(deliveryManEntity);
    const savedDeliveryman = await this.deliveryMan.save(deliveryman);
    return DeliverymanMapper.mapToDomain(savedDeliveryman);
  }

  async findAllDeliveryMans(): Promise<DeliverymanEntity[]> {
    const findedDeliverymans = await this.deliveryMan.find();
    return findedDeliverymans.map((deliveryman) =>
      DeliverymanMapper.mapToDomain(deliveryman),
    );
  }

  async findDeliverymanByIdWithOrders(
    deliverymanId: string,
  ): Promise<DeliverymanEntity> {
    const deliveryman = await this.deliveryMan.findOne({
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
    return DeliverymanMapper.mapToDomain(deliveryman);
  }

  async save(deliveryMan: DeliverymanEntity): Promise<DeliverymanEntity> {
    const deliverymanOrm = DeliverymanMapper.mapToOrm(deliveryMan);
    const savedDeliveryman = await this.deliveryMan.save(deliverymanOrm);
    return DeliverymanMapper.mapToDomain(savedDeliveryman);
  }
}

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DeliverymanOrmEntity } from '../orm-entities/deliveryman.orm-entity';
import { DeliverymanMapper } from '../mappers/deliveryman.mapper';
import { CreateDeliverymanPort } from 'src/domain/deliveryman/ports/out/create-deliveryman.port';
import { FindAllDeliverymansPort } from 'src/domain/deliveryman/ports/out/find-all-deliverymans.port';
import { FindDeliverymanByIdWithOrdersPort } from 'src/domain/deliveryman/ports/out/find-deliveryman-by-id-with-orders.port';
import { SaveDeliverymanPort } from 'src/domain/deliveryman/ports/out/save-deliveryman.port';
import { DeliverymanEntity } from 'src/domain/deliveryman/entities/deliveryman.entity';
import { OrderOrmEntity } from '../orm-entities/orders.orm-entity';
import { FindDeliverymanOrderLadingPort } from 'src/domain/deliveryman/ports/out/find-deliveryman-order-lading';

@Injectable()
export class DeliverymanRepository
  implements
    CreateDeliverymanPort,
    FindAllDeliverymansPort,
    FindDeliverymanByIdWithOrdersPort,
    SaveDeliverymanPort,
    FindDeliverymanOrderLadingPort
{
  constructor(
    @InjectRepository(DeliverymanOrmEntity)
    private deliverymanRepository: Repository<DeliverymanOrmEntity>,
    @InjectRepository(OrderOrmEntity)
    private ordersRepository: Repository<OrderOrmEntity>,
  ) {}

  async findDeliverymanOrderLading(
    deliverymanId: string,
    orderId: string,
  ): Promise<DeliverymanEntity> {
    const deliveryman = await this.deliverymanRepository
      .createQueryBuilder('deliveryman')
      .leftJoinAndSelect('deliveryman.orders', 'orders')
      .leftJoinAndSelect(
        'orders.billOfLadingPositions',
        'billOfLadingPositions',
      )
      .where('deliveryman.id = :deliverymanId', { deliverymanId })
      .andWhere('orders.id = :orderId', { orderId })
      .getOne();
    return DeliverymanMapper.mapToDomain(deliveryman);
  }

  async createDeliveryman(
    deliveryManEntity: DeliverymanEntity,
  ): Promise<DeliverymanEntity> {
    const deliveryman = DeliverymanMapper.mapToOrm(deliveryManEntity);
    const savedDeliveryman = await this.deliverymanRepository.save(deliveryman);
    return DeliverymanMapper.mapToDomain(savedDeliveryman);
  }

  async findAllDeliveryMans(): Promise<DeliverymanEntity[]> {
    const findedDeliverymans = await this.deliverymanRepository.find();
    return findedDeliverymans.map((deliveryman) =>
      DeliverymanMapper.mapToDomain(deliveryman),
    );
  }

  async findDeliverymanByIdWithOrders(
    deliverymanId: string,
  ): Promise<DeliverymanEntity> {
    const deliveryman = await this.deliverymanRepository.findOne({
      where: {
        id: deliverymanId,
      },
    });
    const orders = await this.ordersRepository.findBy({
      deliverymanId: deliveryman.id,
      isActive: true,
    });
    deliveryman.orders = orders;

    return DeliverymanMapper.mapToDomain(deliveryman);
  }

  async save(deliveryMan: DeliverymanEntity): Promise<DeliverymanEntity> {
    const deliverymanOrm = DeliverymanMapper.mapToOrm(deliveryMan);
    const savedDeliveryman = await this.deliverymanRepository.save(
      deliverymanOrm,
    );
    return DeliverymanMapper.mapToDomain(savedDeliveryman);
  }
}

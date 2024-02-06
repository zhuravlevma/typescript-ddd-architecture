import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CurierOrmEntity } from './orm-entities/curier.orm-entity';
import { CurierMapper } from './curier.mapper';
import { OrderOrmEntity } from './orm-entities/orders.orm-entity';
import { CreateCurierOutPort } from '../domain/ports/out/create-curier.out-port';
import { FindAllCuriersOutPort } from '../domain/ports/out/find-all-curiers.out-port';
import { FindCurierByIdWithOrdersOutPort } from '../domain/ports/out/find-curier-by-id-with-orders.out-port';
import { FindCurierOrderLadingOutPort } from '../domain/ports/out/find-curier-order-lading.out-port';
import { SaveCurierOutPort } from '../domain/ports/out/save-curier.out-port';
import { FindCountOfFreeCuriersOutPort } from '../domain/ports/out/find-count-of-free-curiers.out-port';
import { CurierEntity } from '../domain/entities/curier.entity';

@Injectable()
export class CurierRepository
  implements
    CreateCurierOutPort,
    FindAllCuriersOutPort,
    FindCurierByIdWithOrdersOutPort,
    SaveCurierOutPort,
    FindCurierOrderLadingOutPort,
    FindCountOfFreeCuriersOutPort
{
  constructor(
    @InjectRepository(CurierOrmEntity)
    private readonly curierRepository: Repository<CurierOrmEntity>,
    @InjectRepository(OrderOrmEntity)
    private readonly ordersRepository: Repository<OrderOrmEntity>,
  ) {}

  findCountOfFreeCuriers(): Promise<number> {
    return this.curierRepository.count({
      where: { isActive: true },
    });
  }

  async findCurierOrderLading(
    curierId: string,
    orderId: string,
  ): Promise<CurierEntity> {
    const curier = await this.curierRepository
      .createQueryBuilder('curiers')
      .leftJoinAndSelect('curiers.orders', 'orders')
      .where('curiers.id = :curierId', { curierId: curierId })
      .andWhere('orders.id = :orderId', { orderId })
      .getOne();
    return CurierMapper.mapToDomain(curier);
  }

  async createCurier(curierEntity: CurierEntity): Promise<CurierEntity> {
    const curier = CurierMapper.mapToOrm(curierEntity);
    const savedCurier = await this.curierRepository.save(curier);
    return CurierMapper.mapToDomain(savedCurier);
  }

  async findAllCuriers(): Promise<CurierEntity[]> {
    const findedCuriers = await this.curierRepository.find();
    return findedCuriers.map((curier) => CurierMapper.mapToDomain(curier));
  }

  async findCurierByIdWithOrders(curierId: string): Promise<CurierEntity> {
    const curier = await this.curierRepository.findOne({
      where: {
        id: curierId,
      },
    });
    const orders = await this.ordersRepository.findBy({
      curierId: curier.id,
      isActive: true,
    });
    curier.orders = orders;

    return CurierMapper.mapToDomain(curier);
  }

  async save(curier: CurierEntity): Promise<CurierEntity> {
    const curierOrm = CurierMapper.mapToOrm(curier);
    const savedCurier = await this.curierRepository.save(curierOrm);
    return CurierMapper.mapToDomain(savedCurier);
  }
}

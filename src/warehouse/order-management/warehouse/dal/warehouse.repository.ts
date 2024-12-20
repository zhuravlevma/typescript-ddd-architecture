import { WarehouseEntity } from '../domain/entities/warehouse.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { WarehouseMapper } from './warehouse.mapper';
import { OutboxMapper } from '../../../../__relay__/outbox.mapper';
import { SaveWarehouseOutPort } from '../domain/ports/out/save-warehouse.out-port';
import { Injectable } from '@nestjs/common';
import { GetWarehouseWithOrderOutPort } from '../domain/ports/out/get-warehouse-with-order.out-port';
import { GetWarehouseWithOrdersOutPort } from '../domain/ports/out/get-warehouse-with-orders.out-port';
import { WarehouseOrmEntity } from './orm-entities/warehouse.orm-entity';
import { CorrelationService } from 'src/__infrastructure__/correlation/correlation.service';

@Injectable()
export class WarehouseRepository
  implements
    SaveWarehouseOutPort,
    GetWarehouseWithOrdersOutPort,
    GetWarehouseWithOrderOutPort
{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(WarehouseOrmEntity)
    private readonly whRepository: Repository<WarehouseOrmEntity>,
    private readonly correlationService: CorrelationService,
  ) {}

  async getWarehouseWithOrder(
    warehouseId: string,
    orderId: string,
  ): Promise<WarehouseEntity> {
    const whOrm = await this.whRepository
      .createQueryBuilder('warehouses')
      .leftJoinAndSelect('warehouses.orders', 'orders')
      .where('warehouses.id = :warehouseId', { warehouseId })
      .andWhere('orders.id = :orderId', { orderId })
      .getOne();
    return WarehouseMapper.mapToDomain(whOrm);
  }

  async getWarehouseWithOrders(warehouseId: string): Promise<WarehouseEntity> {
    const whOrm = await this.whRepository.findOne({
      where: {
        id: warehouseId,
      },
      relations: {
        orders: true,
      },
    });
    return WarehouseMapper.mapToDomain(whOrm);
  }

  async saveWarehouse(warehouse: WarehouseEntity): Promise<WarehouseEntity> {
    const warehouseORM = WarehouseMapper.mapToORM(warehouse);
    const outboxORM = warehouse
      .pullMessages()
      .map((event) =>
        OutboxMapper.mapToORM(
          event,
          this.correlationService.getCorrelationId(),
        ),
      );

    console.log(outboxORM);

    const whOrm = await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(outboxORM);
        return await transactionalEntityManager.save(warehouseORM);
      },
    );
    return WarehouseMapper.mapToDomain(whOrm);
  }
}

import { WarehouseEntity } from '../domain/entities/warehouse.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { WarehouseMapper } from './warehouse.mapper';
import { OutboxMapper } from 'src/__relay__/outbox.mapper';
import { SaveWarehousePort } from '../domain/ports/out/save-warehouse.port';
import { Injectable } from '@nestjs/common';
import { GetWarehouseWithOrderPort } from '../domain/ports/out/get-warehouse-with-order.port';
import { GetWarehouseWithOrdersPort } from '../domain/ports/out/get-warehouse-with-orders.port';
import { WarehouseOrmEntity } from './orm-entities/warehouse.orm-entity';

@Injectable()
export class WarehouseRepository
  implements SaveWarehousePort, GetWarehouseWithOrdersPort
{
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(WarehouseOrmEntity)
    private whRepository: Repository<WarehouseOrmEntity>,
  ) {}

  async getWarehouseWithOrderPort(
    warehouseId: string,
  ): Promise<WarehouseEntity> {
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
    console.log('fefefefe ');

    const warehouseORM = WarehouseMapper.mapToORM(warehouse);
    const outboxORM = warehouse
      .getUnpublishedEvents()
      .map((event) => OutboxMapper.mapToORM(event));

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

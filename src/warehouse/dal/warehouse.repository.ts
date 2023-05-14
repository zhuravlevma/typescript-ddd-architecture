import { WarehouseEntity } from '../domain/entities/warehouse.entity';
import { UpdateOrderPort } from '../domain/ports/out/update-order.port';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { WarehouseMapper } from './warehouse.mapper';
import { OutboxMapper } from 'src/__relay__/outbox.mapper';

export class WarehouseRepository implements UpdateOrderPort {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}
  async updateOrder(warehouse: WarehouseEntity): Promise<WarehouseEntity> {
    const warehouseORM = WarehouseMapper.mapToORM(warehouse);
    const outboxORM = warehouse
      .getUnpublishedEvents()
      .map((event) => OutboxMapper.mapToORM(event));
    const whOrm = await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(outboxORM);
        return await transactionalEntityManager.save(warehouseORM);
      },
    );
    return WarehouseMapper.mapToDomain(whOrm);
  }
}

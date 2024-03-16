import { SaveWarehouseOutPort } from '../ports/out/save-warehouse.out-port';
import {
  CreateWarehouseParams,
  CreateWarehouseInPort,
} from '../ports/in/create-warehouse.in-port';
import { WarehouseEntity } from '../entities/warehouse.entity';
import { randomUUID } from 'crypto';

export class CreateWarehouseInteractor implements CreateWarehouseInPort {
  constructor(private readonly saveWhPort: SaveWarehouseOutPort) {}

  async execute(
    createWarehouseParams: CreateWarehouseParams,
  ): Promise<WarehouseEntity> {
    return this.saveWhPort.saveWarehouse(
      new WarehouseEntity({
        id: randomUUID(),
        name: createWarehouseParams.name,
        orders: [],
      }),
    );
  }
}

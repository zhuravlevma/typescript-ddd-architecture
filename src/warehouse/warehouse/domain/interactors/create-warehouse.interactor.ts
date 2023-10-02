import { SaveWarehousePort } from '../ports/out/save-warehouse.port';
import {
  CreateWarehouseCommand,
  CreateWarehouseUseCase,
} from '../ports/in/create-warehouse.use-case';
import { WarehouseEntity } from '../entities/warehouse.entity';
import { randomUUID } from 'crypto';

export class CreateWarehouseInteractor implements CreateWarehouseUseCase {
  constructor(private readonly saveWhPort: SaveWarehousePort) {}

  async execute(
    createWarehouseCommand: CreateWarehouseCommand,
  ): Promise<WarehouseEntity> {
    return this.saveWhPort.saveWarehouse(
      new WarehouseEntity({
        id: randomUUID(),
        name: createWarehouseCommand.name,
        orders: [],
      }),
    );
  }
}

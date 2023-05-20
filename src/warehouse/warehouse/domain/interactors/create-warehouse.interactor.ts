import { v4 as uuid } from 'uuid';
import { SaveWarehousePort } from '../ports/out/save-warehouse.port';
import {
  CreateWarehouseCommand,
  CreateWarehouseUseCase,
} from '../ports/in/create-warehouse.use-case';
import { WarehouseEntity } from '../entities/warehouse.entity';

export class CreateWarehouseInteractor implements CreateWarehouseUseCase {
  constructor(private readonly saveWhPort: SaveWarehousePort) {}

  async execute(
    createWarehouseCommand: CreateWarehouseCommand,
  ): Promise<WarehouseEntity> {
    return this.saveWhPort.saveWarehouse(
      new WarehouseEntity({
        id: uuid(),
        name: createWarehouseCommand.name,
        orders: [],
      }),
    );
  }
}

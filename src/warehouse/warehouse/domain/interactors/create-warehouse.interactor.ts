import { v4 as uuid } from 'uuid';
import { SaveWarehousePort } from '../ports/out/save-warehouse.port';
import {
  CreateWarehouseDto,
  CreateWarehouseUseCase,
} from '../ports/in/create-warehouse.use-case';
import { WarehouseEntity } from '../entities/warehouse.entity';

export class CreateWarehouseInteractor implements CreateWarehouseUseCase {
  constructor(private readonly saveWhPort: SaveWarehousePort) {}

  async execute(
    createWarehouseDto: CreateWarehouseDto,
  ): Promise<WarehouseEntity> {
    return this.saveWhPort.saveWarehouse(
      new WarehouseEntity({
        id: uuid(),
        name: createWarehouseDto.name,
        orders: [],
      }),
    );
  }
}

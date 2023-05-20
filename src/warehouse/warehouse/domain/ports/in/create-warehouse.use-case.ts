import { WarehouseEntity } from '../../entities/warehouse.entity';

export interface CreateWarehouseCommand {
  name: string;
}

export abstract class CreateWarehouseUseCase {
  abstract execute(
    createWarehouseCommand: CreateWarehouseCommand,
  ): Promise<WarehouseEntity>;
}

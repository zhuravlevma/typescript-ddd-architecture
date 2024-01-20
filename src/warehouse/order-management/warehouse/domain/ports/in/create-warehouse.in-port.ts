import { WarehouseEntity } from '../../entities/warehouse.entity';

export interface CreateWarehouseCommand {
  name: string;
}

export abstract class CreateWarehouseInPort {
  abstract execute(
    createWarehouseCommand: CreateWarehouseCommand,
  ): Promise<WarehouseEntity>;
}

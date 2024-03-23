import { WarehouseEntity } from '../../entities/warehouse.entity';

export interface CreateWarehouseParams {
  name: string;
}

export abstract class CreateWarehouseInPort {
  abstract execute(createWarehouseCommand: CreateWarehouseParams): Promise<WarehouseEntity>;
}

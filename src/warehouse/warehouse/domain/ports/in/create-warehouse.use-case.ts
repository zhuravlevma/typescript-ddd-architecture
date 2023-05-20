import { WarehouseEntity } from '../../entities/warehouse.entity';

export interface CreateWarehouseDto {
  name: string;
}

export abstract class CreateWarehouseUseCase {
  abstract execute(
    createWarehouseDto: CreateWarehouseDto,
  ): Promise<WarehouseEntity>;
}

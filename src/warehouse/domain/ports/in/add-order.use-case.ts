import { WarehouseEntity } from '../../entities/warehouse.entity';

export interface AddOrderDto {
  warehouseId: string;
  name: string;
  orderId: string;
  isValid: boolean;
}

export abstract class AddOrderUseCase {
  abstract execute(addOrderDto: AddOrderDto): Promise<WarehouseEntity>;
}

import { WarehouseEntity } from '../../entities/warehouse.entity';

export abstract class GetLastWhOutPort {
  abstract getLastWh(): Promise<WarehouseEntity>;
}

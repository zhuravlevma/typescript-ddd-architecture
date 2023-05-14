import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface CreateOrderDto {
  id: string;
}
export abstract class CreateOrderUseCase {
  abstract execute(createOrderDto: CreateOrderDto): Promise<DeliverymanEntity>;
}

import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface CreateDeliverymanDto {
  firstName: string;
  lastName: string;
}

export abstract class CreateDeliverymanUseCase {
  abstract execute(
    createDeliverymanDto: CreateDeliverymanDto,
  ): Promise<DeliverymanEntity>;
}

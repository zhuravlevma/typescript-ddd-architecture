import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export abstract class FindAllDeliverymansUseCase {
  abstract findAll(): Promise<DeliverymanEntity[]>;
}

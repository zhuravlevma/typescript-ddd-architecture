import { DeliverymanEntity } from '../../deliveryman/entities/deliveryman.entity';

export abstract class FindAllDeliverymansUseCase {
  abstract findAll(): Promise<DeliverymanEntity[]>;
}

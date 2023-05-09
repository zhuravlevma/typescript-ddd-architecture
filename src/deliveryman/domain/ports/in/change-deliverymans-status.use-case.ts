import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface ChangeDeliverymansStatusDto {
  deliverymanId: string;
  isActive: boolean;
}

export abstract class ChangeDeliverymansStatusUseCase {
  abstract execute(
    changeDeliverymansStatusDto: ChangeDeliverymansStatusDto,
  ): Promise<DeliverymanEntity>;
}

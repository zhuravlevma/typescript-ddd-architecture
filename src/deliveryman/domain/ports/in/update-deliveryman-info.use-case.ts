import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface UpdateDeliverymansInfoDto {
  deliverymanId: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
}
export abstract class UpdateDeliverymansInfoUseCase {
  abstract execute(
    updateDeliverymanInfoDto: UpdateDeliverymansInfoDto,
  ): Promise<DeliverymanEntity>;
}

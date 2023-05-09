import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface UpdateDeliverymansOrdersDto {
  deliverymanId: string;
  description?: string;
}
export abstract class UpdateDeliverymansOrdersUseCase {
  abstract execute(
    updateDeliverymansOrdersDto: UpdateDeliverymansOrdersDto,
  ): Promise<DeliverymanEntity>;
}

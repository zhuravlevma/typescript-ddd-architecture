import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface UpdateOrderStatusDto {
  deliverymanId: string;
  orderId: string;
  delivered?: boolean;
  returned?: boolean;
}
export abstract class UpdateOrderStatusUseCase {
  abstract execute(
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<DeliverymanEntity>;
}

import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export abstract class FindDeliverymanOrderLadingPort {
  abstract findDeliverymanOrderLading(
    deliverymanId: string,
    orderId: string,
  ): Promise<DeliverymanEntity | null>;
}

import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export abstract class FindDeliverymanOrderLadingOutPort {
  abstract findDeliverymanOrderLading(
    deliverymanId: string,
    orderId: string,
  ): Promise<DeliverymanEntity | null>;
}

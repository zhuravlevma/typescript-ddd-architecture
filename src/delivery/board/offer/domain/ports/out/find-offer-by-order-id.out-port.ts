import { OfferEntity } from '../../entities/offer.entity';

export abstract class FindOfferByOrderIdOutPort {
  abstract findOfferByOrderId(orderId: string): Promise<OfferEntity>;
}

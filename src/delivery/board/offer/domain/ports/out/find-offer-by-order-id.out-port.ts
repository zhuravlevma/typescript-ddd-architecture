import { OfferEntity } from '../../entities/offer.entity';

export abstract class FindOfferByOrderIdOutPort {
  abstract findOfferByOrderIdPort(orderId: string): Promise<OfferEntity>;
}

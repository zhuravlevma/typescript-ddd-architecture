import { OfferEntity } from '../../entities/offer.entity';

export abstract class FindOfferByOrderIdPort {
  abstract findOfferByOrderIdPort(orderId: string): Promise<OfferEntity>;
}

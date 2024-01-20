import { OfferEntity } from '../../entities/offer.entity';

export abstract class FindOfferByIdOutPort {
  abstract findOfferByIdPort(offerId: string): Promise<OfferEntity>;
}

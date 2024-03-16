import { OfferEntity } from '../../entities/offer.entity';

export abstract class FindOfferByIdOutPort {
  abstract findOfferById(offerId: string): Promise<OfferEntity>;
}

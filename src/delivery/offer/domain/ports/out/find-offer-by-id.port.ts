import { OfferEntity } from '../../entities/offer.entity';

export abstract class FindOfferByIdPort {
  abstract findOfferByIdPort(offerId: string): Promise<OfferEntity>;
}

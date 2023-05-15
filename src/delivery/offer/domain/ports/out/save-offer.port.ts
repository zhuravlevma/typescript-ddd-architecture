import { OfferEntity } from '../../entities/offer.entity';

export abstract class SaveOfferPort {
  abstract saveOffer(offer: OfferEntity): Promise<OfferEntity>;
}

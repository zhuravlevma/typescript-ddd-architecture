import { OfferEntity } from '../../entities/offer.entity';

export abstract class SaveOfferOutPort {
  abstract saveOffer(offer: OfferEntity): Promise<OfferEntity>;
}

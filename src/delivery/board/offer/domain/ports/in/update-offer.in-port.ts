import { OfferEntity } from '../../entities/offer.entity';

export interface UpdateOfferParams {
  offerId: string;
  curierId: string;
}

export abstract class UpdateOfferInPort {
  abstract execute(updateOfferCommand: UpdateOfferParams): Promise<OfferEntity>;
}

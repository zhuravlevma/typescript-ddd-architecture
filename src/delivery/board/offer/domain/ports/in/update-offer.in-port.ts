import { OfferEntity } from '../../entities/offer.entity';

export interface UpdateOfferCommand {
  offerId: string;
  deliverymanId: string;
}

export abstract class UpdateOfferInPort {
  abstract execute(
    updateOfferCommand: UpdateOfferCommand,
  ): Promise<OfferEntity>;
}

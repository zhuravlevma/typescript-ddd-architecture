import { OfferEntity } from '../../entities/offer.entity';

export interface CreateOfferCommand {
  name: string;
  orderId: string;
}

export abstract class CreateOfferInPort {
  abstract execute(
    createOfferCommand: CreateOfferCommand,
  ): Promise<OfferEntity>;
}

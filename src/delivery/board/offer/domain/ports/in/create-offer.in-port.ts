import { OfferEntity } from '../../entities/offer.entity';

export interface CreateOfferParams {
  name: string;
  orderId: string;
}

export abstract class CreateOfferInPort {
  abstract execute(createOfferCommand: CreateOfferParams): Promise<OfferEntity>;
}

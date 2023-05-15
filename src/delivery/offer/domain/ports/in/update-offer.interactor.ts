import { OfferEntity } from '../../entities/offer.entity';

export interface UpdateOfferDto {
  offerId: string;
  deliverymanId: string;
}

export abstract class UpdateOfferUseCase {
  abstract execute(updateOfferDto: UpdateOfferDto): Promise<OfferEntity>;
}

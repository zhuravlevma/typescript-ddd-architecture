import { OfferEntity } from '../../entities/offer.entity';

export interface CreateOfferDto {
  name: string;
  orderId: string;
}

export abstract class CreateOfferUseCase {
  abstract execute(createOfferDto: CreateOfferDto): Promise<OfferEntity>;
}

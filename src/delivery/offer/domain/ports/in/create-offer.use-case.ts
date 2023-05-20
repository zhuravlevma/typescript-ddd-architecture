import { OfferEntity } from '../../entities/offer.entity';

export interface CreateOfferCommand {
  name: string;
  orderId: string;
}

export abstract class CreateOfferUseCase {
  abstract execute(
    createOfferCommand: CreateOfferCommand,
  ): Promise<OfferEntity>;
}

import { v4 as uuid } from 'uuid';
import { SaveOfferPort } from '../ports/out/save-offer.port';
import { OfferEntity } from '../entities/offer.entity';
import {
  CreateOfferCommand,
  CreateOfferUseCase,
} from '../ports/in/create-offer.use-case';

export class CreateOfferInteractor implements CreateOfferUseCase {
  constructor(private readonly saveOfferPort: SaveOfferPort) {}

  async execute(createOfferCommand: CreateOfferCommand): Promise<OfferEntity> {
    try {
      const offer = new OfferEntity({
        id: uuid(),
        name: createOfferCommand.name,
        orderId: createOfferCommand.orderId,
        deliverymanId: null,
      });

      return this.saveOfferPort.saveOffer(offer);
    } catch (error) {
      return error.message;
    }
  }
}

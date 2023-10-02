import { SaveOfferPort } from '../ports/out/save-offer.port';
import { OfferEntity } from '../entities/offer.entity';
import {
  CreateOfferCommand,
  CreateOfferUseCase,
} from '../ports/in/create-offer.use-case';
import { randomUUID } from 'crypto';

export class CreateOfferInteractor implements CreateOfferUseCase {
  constructor(private readonly saveOfferPort: SaveOfferPort) {}

  async execute(createOfferCommand: CreateOfferCommand): Promise<OfferEntity> {
    try {
      const offer = new OfferEntity({
        id: randomUUID(),
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

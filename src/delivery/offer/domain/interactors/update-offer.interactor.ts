import { v4 as uuid } from 'uuid';
import { SaveOfferPort } from '../ports/out/save-offer.port';
import { OfferEntity } from '../entities/offer.entity';
import {
  UpdateOfferCommand,
  UpdateOfferUseCase,
} from '../ports/in/update-offer.interactor';
import { FindOfferByIdPort } from '../ports/out/find-offer-by-id.port';

export class UpdateOfferInteractor implements UpdateOfferUseCase {
  constructor(
    private readonly findOfferByIdPort: FindOfferByIdPort,
    private readonly saveOfferPort: SaveOfferPort,
  ) {}

  async execute(updateOfferCommand: UpdateOfferCommand): Promise<OfferEntity> {
    try {
      const offer = await this.findOfferByIdPort.findOfferByIdPort(
        updateOfferCommand.offerId,
      );

      if (updateOfferCommand.deliverymanId !== undefined) {
        offer.deliverymanTakeOffer(updateOfferCommand.deliverymanId);
      }

      return this.saveOfferPort.saveOffer(offer);
    } catch (error) {
      return error.message;
    }
  }
}

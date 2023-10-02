import { SaveOfferOutPort } from '../ports/out/save-offer.out-port';
import { OfferEntity } from '../entities/offer.entity';
import {
  UpdateOfferCommand,
  UpdateOfferInPort,
} from '../ports/in/update-offer.in-port';
import { FindOfferByIdOutPort } from '../ports/out/find-offer-by-id.out-port';

export class UpdateOfferInteractor implements UpdateOfferInPort {
  constructor(
    private readonly findOfferByIdPort: FindOfferByIdOutPort,
    private readonly saveOfferPort: SaveOfferOutPort,
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

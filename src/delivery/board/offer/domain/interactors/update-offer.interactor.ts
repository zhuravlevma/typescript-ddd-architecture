import { SaveOfferOutPort } from '../ports/out/save-offer.out-port';
import { OfferEntity } from '../entities/offer.entity';
import {
  UpdateOfferParams,
  UpdateOfferInPort,
} from '../ports/in/update-offer.in-port';
import { FindOfferByIdOutPort } from '../ports/out/find-offer-by-id.out-port';

export class UpdateOfferInteractor implements UpdateOfferInPort {
  constructor(
    private readonly findOfferByIdPort: FindOfferByIdOutPort,
    private readonly saveOfferPort: SaveOfferOutPort,
  ) {}

  async execute(updateOfferParams: UpdateOfferParams): Promise<OfferEntity> {
    try {
      const offer = await this.findOfferByIdPort.findOfferById(
        updateOfferParams.offerId,
      );

      if (updateOfferParams.curierId !== undefined) {
        offer.curierTakeOffer(updateOfferParams.curierId);
      }

      return this.saveOfferPort.saveOffer(offer);
    } catch (error) {
      return error.message;
    }
  }
}

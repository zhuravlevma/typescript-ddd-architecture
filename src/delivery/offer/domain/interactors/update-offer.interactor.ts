import { v4 as uuid } from 'uuid';
import { SaveOfferPort } from '../ports/out/save-offer.port';
import { OfferEntity } from '../entities/offer.entity';
import {
  UpdateOfferDto,
  UpdateOfferUseCase,
} from '../ports/in/update-offer.interactor';
import { FindOfferByIdPort } from '../ports/out/find-offer-by-id.port';

export class CreateOfferInteractor implements UpdateOfferUseCase {
  constructor(
    private readonly findOfferByIdPort: FindOfferByIdPort,
    private readonly saveOfferPort: SaveOfferPort,
  ) {}

  async execute(updateOfferDto: UpdateOfferDto): Promise<OfferEntity> {
    try {
      const offer = await this.findOfferByIdPort.findOfferByIdPort(
        updateOfferDto.offerId,
      );

      if (updateOfferDto.deliverymanId !== undefined) {
        offer.deliverymanTakeOffer(updateOfferDto.deliverymanId);
      }

      return this.saveOfferPort.saveOffer(offer);
    } catch (error) {
      return error.message;
    }
  }
}
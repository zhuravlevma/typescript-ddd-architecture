import { SaveOfferOutPort } from '../ports/out/save-offer.out-port';
import { OfferEntity } from '../entities/offer.entity';
import {
  CreateOfferCommand,
  CreateOfferInPort,
} from '../ports/in/create-offer.in-port';
import { randomUUID } from 'crypto';

export class CreateOfferInteractor implements CreateOfferInPort {
  constructor(private readonly saveOfferPort: SaveOfferOutPort) {}

  async execute(createOfferCommand: CreateOfferCommand): Promise<OfferEntity> {
    try {
      const offer = new OfferEntity({
        id: randomUUID(),
        name: createOfferCommand.name,
        orderId: createOfferCommand.orderId,
        deliverymanId: null,
        vehicleType: 'bike',
        preferredDeliveryAreas: 'New York',
        workingHours: '8-11',
        weight: 0,
        bid: 5,
      });

      return this.saveOfferPort.saveOffer(offer);
    } catch (error) {
      return error.message;
    }
  }
}

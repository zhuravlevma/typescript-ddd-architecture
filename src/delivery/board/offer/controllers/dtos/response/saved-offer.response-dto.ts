import { OfferEntity } from '../../domain/entities/offer.entity';

export class SavedOfferResponseDto {
  id: string;
  name: string;
  orderId: string;
  curierId: string | null;
  vehicleType: string;
  preferredDeliveryAreas: string;
  workingHours: string;
  weight: number;
  bid: number;

  static fromDomain(entity: OfferEntity): SavedOfferResponseDto {
    const respDto = new SavedOfferResponseDto();
    const offerReadonly = entity.export();
    respDto.id = offerReadonly.id;
    respDto.name = offerReadonly.name;
    respDto.orderId = offerReadonly.orderId;
    respDto.curierId = offerReadonly.curierId;
    respDto.vehicleType = offerReadonly.vehicleType;
    respDto.preferredDeliveryAreas = offerReadonly.preferredDeliveryAreas;
    respDto.workingHours = offerReadonly.workingHours;
    respDto.weight = offerReadonly.weight;
    respDto.bid = offerReadonly.bid;
    return respDto;
  }
}

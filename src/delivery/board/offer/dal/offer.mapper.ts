import { OfferEntity } from '../domain/entities/offer.entity';
import { OfferOrmEntity } from './orm-entities/offer.orm-entity';

export class OfferMapper {
  static mapToDomain(offerOrm: OfferOrmEntity): OfferEntity {
    return new OfferEntity({
      id: offerOrm.id,
      orderId: offerOrm.orderId,
      name: offerOrm.name,
      vehicleType: offerOrm.vehicleType,
      preferredDeliveryAreas: offerOrm.preferredDeliveryAreas,
      workingHours: offerOrm.workingHours,
      weight: offerOrm.weight,
      bid: offerOrm.bid,
      curierId: offerOrm.curierid,
    });
  }
  static mapToOrm(offerEntity: OfferEntity): OfferOrmEntity {
    const offerOrmEntity = new OfferOrmEntity();
    const offerReadonly = offerEntity.export();
    offerOrmEntity.id = offerReadonly.id;
    offerOrmEntity.curierid = offerReadonly.curierId;
    offerOrmEntity.name = offerReadonly.name;
    offerOrmEntity.orderId = offerReadonly.orderId;
    offerOrmEntity.vehicleType = offerReadonly.vehicleType;
    offerOrmEntity.preferredDeliveryAreas = offerReadonly.preferredDeliveryAreas;
    offerOrmEntity.workingHours = offerReadonly.workingHours;
    offerOrmEntity.weight = offerReadonly.weight;
    offerOrmEntity.bid = offerReadonly.bid;

    return offerOrmEntity;
  }
}

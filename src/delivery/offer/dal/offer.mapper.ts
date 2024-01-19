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
      deliverymanId: offerOrm.deliverymanId,
    });
  }
  static mapToOrm(offerEntity: OfferEntity): OfferOrmEntity {
    const offerOrmEntity = new OfferOrmEntity();
    offerOrmEntity.id = offerEntity.id;
    offerOrmEntity.deliverymanId = offerEntity.deliverymanId;
    offerOrmEntity.name = offerEntity.name;
    offerOrmEntity.orderId = offerEntity.orderId;
    offerOrmEntity.vehicleType = offerEntity.vehicleType;
    offerOrmEntity.preferredDeliveryAreas = offerEntity.preferredDeliveryAreas;
    offerOrmEntity.workingHours = offerEntity.workingHours;
    offerOrmEntity.weight = offerEntity.weight;
    offerOrmEntity.bid = offerEntity.bid;

    return offerOrmEntity;
  }
}

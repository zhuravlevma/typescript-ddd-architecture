import { DomainMessage } from 'src/__lib__/domain-message';
import { OfferTakedEvent } from '../events/offer-taked.event';

interface Attributes {
  id: string;
  name: string;
  orderId: string;
  deliverymanId: string | null;
  vehicleType: string;
  preferredDeliveryAreas: string;
  workingHours: string;
  weight: number;
  bid: number;
}

export class OfferEntity implements Attributes {
  id: string;
  name: string;
  orderId: string;
  deliverymanId: string | null;
  events: DomainMessage[];
  vehicleType: string;
  preferredDeliveryAreas: string;
  workingHours: string;
  weight: number;
  bid: number;

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.orderId = attributes.orderId;
    this.deliverymanId = attributes.deliverymanId;
    this.vehicleType = attributes.vehicleType;
    this.preferredDeliveryAreas = attributes.preferredDeliveryAreas;
    this.workingHours = attributes.workingHours;
    this.weight = attributes.weight;
    this.bid = attributes.bid;
    this.events = [];
  }

  setVehicleType(type: string) {
    this.vehicleType = type;
  }

  setPreferredDeliveryAreas(areas: string) {
    this.preferredDeliveryAreas = areas;
  }

  setWorkingHours(hours: string) {
    this.workingHours = hours;
  }

  private updateBid() {
    if (this.weight <= 5) {
      this.bid = 10;
    } else if (this.weight <= 10) {
      this.bid = 20;
    } else {
      this.bid = 30;
    }
  }

  increaseBid(amount: number) {
    this.bid += amount;
  }

  setWeight(weight: number) {
    if (weight < 0) {
      throw new Error('Order weight cannot be negative');
    } else if (weight <= 5) {
      this.vehicleType = 'Bike';
    } else if (weight <= 10) {
      this.vehicleType = 'Auto';
    } else {
      this.vehicleType = 'Big truck';
    }

    this.weight = weight;
    this.updateBid();
  }

  deliverymanTakeOffer(deliverymanId: string) {
    this.deliverymanId = deliverymanId;
    this.events.push(
      new OfferTakedEvent({
        aggregateId: this.id,
        correlationId: 'requestID',
        payload: {
          orderId: this.orderId,
          deliverymanId: this.deliverymanId,
        },
      }),
    );
  }
}

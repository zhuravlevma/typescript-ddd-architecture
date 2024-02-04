import { OfferTakedEvent } from '../events/offer-taked.event';
import { Aggregate } from 'src/__lib__/aggregate';

interface Attributes {
  id: string;
  name: string;
  orderId: string;
  curierId: string | null;
  vehicleType: string;
  preferredDeliveryAreas: string;
  workingHours: string;
  weight: number;
  bid: number;
}

export class OfferEntity extends Aggregate<Attributes> {
  constructor(attributes: Attributes) {
    super(attributes);
  }

  setVehicleType(type: string) {
    this.__data.vehicleType = type;
  }

  setPreferredDeliveryAreas(areas: string) {
    this.__data.preferredDeliveryAreas = areas;
  }

  setWorkingHours(hours: string) {
    this.__data.workingHours = hours;
  }

  private updateBid() {
    if (this.__data.weight <= 5) {
      this.__data.bid = 10;
    } else if (this.__data.weight <= 10) {
      this.__data.bid = 20;
    } else {
      this.__data.bid = 30;
    }
  }

  increaseBid(amount: number) {
    this.__data.bid += amount;
  }

  setWeight(weight: number) {
    if (weight < 0) {
      throw new Error('Order weight cannot be negative');
    } else if (weight <= 5) {
      this.__data.vehicleType = 'Bike';
    } else if (weight <= 10) {
      this.__data.vehicleType = 'Auto';
    } else {
      this.__data.vehicleType = 'Big truck';
    }

    this.__data.weight = weight;
    this.updateBid();
  }

  curierTakeOffer(curierId: string) {
    this.__data.curierId = curierId;
    this.addMessage(
      new OfferTakedEvent({
        aggregateId: this.__data.id,
        correlationId: 'requestID',
        payload: {
          orderId: this.__data.orderId,
          curierId: this.__data.curierId,
        },
      }),
    );
  }
}

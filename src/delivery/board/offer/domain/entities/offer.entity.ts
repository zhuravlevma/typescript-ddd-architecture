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
  private id: string;
  private name: string;
  private orderId: string;
  private curierId: string | null;
  private vehicleType: string;
  private preferredDeliveryAreas: string;
  private workingHours: string;
  private weight: number;
  private bid: number;
  constructor(attributes: Attributes) {
    super();
    this.id = attributes.id;
    this.name = attributes.name;
    this.orderId = attributes.orderId;
    this.curierId = attributes.curierId;
    this.vehicleType = attributes.vehicleType;
    this.preferredDeliveryAreas = attributes.preferredDeliveryAreas;
    this.workingHours = attributes.workingHours;
    this.bid = attributes.bid;
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

  curierTakeOffer(curierId: string) {
    this.curierId = curierId;
    this.addMessage(
      new OfferTakedEvent({
        aggregateId: this.id,
        payload: {
          orderId: this.orderId,
          curierId: this.curierId,
        },
      }),
    );
  }
}

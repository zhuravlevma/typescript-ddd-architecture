import { DomainEvent } from 'src/__relay__/domain-event';
import { OfferTakedEvent } from '../events/offer-taked.event';

interface Attributes {
  id: string;
  name: string;
  orderId: string;
  deliverymanId: string | null;
}

export class OfferEntity implements Attributes {
  id: string;
  name: string;
  orderId: string;
  deliverymanId: string | null;
  events: DomainEvent[];

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.orderId = attributes.orderId;
    this.deliverymanId = attributes.deliverymanId;
    this.events = [];
  }

  deliverymanTakeOffer(deliverymanId: string) {
    this.deliverymanId = deliverymanId;
    this.events.push(
      new OfferTakedEvent({
        reason: 'offer taked',
        payload: {
          orderId: this.orderId,
          deliverymanId: this.orderId,
        },
      }),
    );
  }
}

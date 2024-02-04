import { Entity } from 'src/__lib__/entity';

interface Attributes {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  weight: number;
  totalSum: number;
  curierId: string;
  orderId: string;
}
export class OrderEntity extends Entity<Attributes> {
  constructor(attributes: Attributes) {
    super(attributes);
  }

  get weight() {
    return this.__data.weight;
  }

  get id() {
    return this.__data.id;
  }

  get isActive() {
    return this.__data.isActive;
  }

  checkName() {
    if (this.__data.name.length < 3) {
      throw new Error('The length of the name is less than 3');
    }
  }

  markAsDelayedDueToTraffic(): void {
    this.__data.isActive = false;
    this.addInfoToDescription('Order delayed due to heavy traffic.');
  }

  requestGiftWrapping(): void {
    this.addInfoToDescription('Gift wrapping requested.');
    this.__data.totalSum += 5;
  }

  cancelOrder(): void {
    if (this.isActive === false) {
      this.__data.isActive = false;
      this.addInfoToDescription('Order cancelled by customer.');
    } else {
      throw new Error('Order cannot be cancelled. Invalid order status.');
    }
  }

  applyTip(tipAmount: number): void {
    if (this.isActive === true) {
      this.__data.totalSum += tipAmount;
      this.addInfoToDescription(`Tip applied: $${tipAmount.toFixed(2)}`);
    } else {
      throw new Error('Tip cannot be applied. Order is not delivered.');
    }
  }

  deliverOrder() {
    this.__data.isActive = false;
    this.addInfoToDescription('This order has been delivered.');
  }

  addInfoToDescription(info: string) {
    this.__data.description += '\n' + info;
  }

  returnOrder() {
    this.__data.isActive = false;
    this.addInfoToDescription('This order has been returned :(');
  }
}

import { Entity } from '../../../../../__lib__/entity';

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
  private id: string;
  private name: string;
  private description: string;
  private isActive: boolean;
  private weight: number;
  private totalSum: number;
  private curierId: string;
  private orderId: string;
  constructor(attributes: Attributes) {
    super();
    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.isActive = attributes.isActive;
    this.weight = attributes.weight;
    this.totalSum = attributes.totalSum;
    this.curierId = attributes.curierId;
    this.orderId = attributes.orderId;
  }

  get Weight() {
    return this.weight;
  }

  get Id() {
    return this.id;
  }

  get IsActive() {
    return this.isActive;
  }

  checkName() {
    if (this.name.length < 3) {
      throw new Error('The length of the name is less than 3');
    }
  }

  markAsDelayedDueToTraffic(): void {
    this.isActive = false;
    this.addInfoToDescription('Order delayed due to heavy traffic.');
  }

  requestGiftWrapping(): void {
    this.addInfoToDescription('Gift wrapping requested.');
    this.totalSum += 5;
  }

  cancelOrder(): void {
    if (this.isActive === true) {
      this.isActive = false;
      this.addInfoToDescription('Order cancelled by customer.');
    } else {
      throw new Error('Order cannot be cancelled. Invalid order status.');
    }
  }

  applyTip(tipAmount: number): void {
    if (this.isActive === true) {
      this.totalSum += tipAmount;
      this.addInfoToDescription(`Tip applied: $${tipAmount.toFixed(2)}`);
    } else {
      throw new Error('Tip cannot be applied. Order is not delivered.');
    }
  }

  deliverOrder() {
    this.isActive = false;
    this.addInfoToDescription('This order has been delivered.');
  }

  addInfoToDescription(info: string) {
    this.description += '\n' + info;
  }

  returnOrder() {
    this.isActive = false;
    this.addInfoToDescription('This order has been returned :(');
  }
}

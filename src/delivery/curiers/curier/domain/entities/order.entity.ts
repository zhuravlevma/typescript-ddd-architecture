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
export class OrderEntity implements Attributes {
  readonly id: string;
  readonly name: string;
  private _description: string;
  private _isActive: boolean;
  private _totalSum: number;
  readonly curierId: string;
  readonly weight: number;
  readonly orderId: string;

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this._description = attributes.description;
    this._isActive = attributes.isActive;
    this.curierId = attributes.curierId;
    this.orderId = attributes.orderId;
    this._totalSum = attributes.totalSum;
    this.weight = attributes.weight;
  }

  get description() {
    return this._description;
  }

  get totalSum() {
    return this._totalSum;
  }

  get isActive() {
    return this._isActive;
  }

  checkName() {
    if (this.name.length < 3) {
      throw new Error('The length of the name is less than 3');
    }
  }

  markAsDelayedDueToTraffic(): void {
    this._isActive = false;
    this.addInfoToDescription('Order delayed due to heavy traffic.');
  }

  requestGiftWrapping(): void {
    this.addInfoToDescription('Gift wrapping requested.');
    this._totalSum += 5;
  }

  cancelOrder(): void {
    if (this.isActive === false) {
      this._isActive = false;
      this.addInfoToDescription('Order cancelled by customer.');
    } else {
      throw new Error('Order cannot be cancelled. Invalid order status.');
    }
  }

  applyTip(tipAmount: number): void {
    if (this.isActive === true) {
      this._totalSum += tipAmount;
      this.addInfoToDescription(`Tip applied: $${tipAmount.toFixed(2)}`);
    } else {
      throw new Error('Tip cannot be applied. Order is not delivered.');
    }
  }

  deliverOrder() {
    this._isActive = false;
    this.addInfoToDescription('This order has been delivered.');
  }

  addInfoToDescription(info: string) {
    this._description += '\n' + info;
  }

  returnOrder() {
    this._isActive = false;
    this.addInfoToDescription('This order has been returned :(');
  }
}

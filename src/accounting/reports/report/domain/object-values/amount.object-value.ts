import { ObjectValues } from 'src/__lib__/object-values';

interface Attributes {
  amount: number;
  rate: number;
}
export class AmountObjectValue extends ObjectValues<Attributes> {
  public amount: number;
  public rate: number;
  constructor(attributes: Attributes) {
    super();
    this.amount = attributes.amount;
    this.rate = attributes.rate;
  }

  applyDiscount(discount: number): number {
    return this.amount * discount;
  }

  getAmoutWithoutTax(): number {
    return this.amount * (100 - this.rate);
  }

  differenceAfterTax(): number {
    return this.amount - this.getAmoutWithoutTax();
  }
}

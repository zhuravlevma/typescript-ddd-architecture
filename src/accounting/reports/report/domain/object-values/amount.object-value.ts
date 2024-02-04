import { ObjectValues } from 'src/__lib__/object-values';

interface Attributes {
  amount: number;
  rate: number;
}
export class AmountObjectValue extends ObjectValues<Attributes> {
  constructor(attributes: Attributes) {
    super(attributes);
  }

  applyDiscount(discount: number) {
    this.__data.amount *= discount;
  }

  getAmoutWithoutTax(): number {
    return this.__data.amount * (100 - this.__data.rate);
  }

  differenceAfterTax(): number {
    return this.__data.amount - this.getAmoutWithoutTax();
  }

  updateTaxRate(rate: number) {
    this.__data.rate = rate;
  }
}

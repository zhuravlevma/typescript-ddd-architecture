import { AmountObjectValue } from '../object-values/amount.object-value';

interface Attributes {
  id: string;
  name: string;
  count: number;
  code: number;
  weight: number;
  amount: AmountObjectValue;
}

export class ReportPositionEntity implements Attributes {
  readonly id: string;
  readonly name: string;
  readonly count: number;
  readonly code: number;
  readonly weight: number;
  readonly amount: AmountObjectValue;

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.count = attributes.count;
    this.code = attributes.code;
    this.weight = attributes.weight;
    this.amount = attributes.amount;
  }

  priceOfOnePosition() {
    return this.amount.getAmoutWithoutTax() / this.count;
  }

  getPriceWithTax(): number {
    return this.priceOfOnePosition() + this.getValueOfTax();
  }

  hasNegativeDifferenceAfterTax(): boolean {
    return this.amount.differenceAfterTax() < 0;
  }

  getValueOfTax() {
    return this.amount.differenceAfterTax();
  }

  updatePositionDiscount(discount: number) {
    return this.amount.applyDiscount(discount);
  }

  updateTaxRate(newTaxRate: number) {
    this.amount.updateTaxRate(newTaxRate);
  }

  getSumWithoutRate() {
    return this.amount.getAmoutWithoutTax();
  }

  getWeightOfOnePostition() {
    return this.weight / this.count;
  }

  hasEmptyRate(): boolean {
    if (this.amount.differenceAfterTax() === 0) {
      return true;
    }
    return false;
  }
}

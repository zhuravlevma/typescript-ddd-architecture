import { AmountObjectValue } from '../object-values/amount.object-value';
import { Entity } from 'src/__lib__/entity';

interface Attributes {
  id: string;
  name: string;
  count: number;
  code: number;
  weight: number;
  amount: AmountObjectValue;
}

export class ReportPositionEntity extends Entity<Attributes> {
  constructor(attributes: Attributes) {
    super(attributes);
  }

  priceOfOnePosition(): number {
    return this.__data.amount.getAmoutWithoutTax() / this.__data.count;
  }

  getPriceWithTax(): number {
    return this.priceOfOnePosition() + this.getValueOfTax();
  }

  hasNegativeDifferenceAfterTax(): boolean {
    return this.__data.amount.differenceAfterTax() < 0;
  }

  getValueOfTax(): number {
    return this.__data.amount.differenceAfterTax();
  }

  updatePositionDiscount(discount: number) {
    return this.__data.amount.applyDiscount(discount);
  }

  updateTaxRate(newTaxRate: number) {
    this.__data.amount.updateTaxRate(newTaxRate);
  }

  getSumWithoutRate(): number {
    return this.__data.amount.getAmoutWithoutTax();
  }

  getWeightOfOnePostition(): number {
    return this.__data.weight / this.__data.count;
  }

  hasEmptyRate(): boolean {
    if (this.__data.amount.differenceAfterTax() === 0) {
      return true;
    }
    return false;
  }
}

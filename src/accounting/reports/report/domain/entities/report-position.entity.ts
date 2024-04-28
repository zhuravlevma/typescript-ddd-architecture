import { AmountObjectValue } from '../object-values/amount.object-value';
import { Entity } from 'src/__lib__/entity';

interface Attributes {
  id: string;
  name: string;
  count: number;
  code: number;
  weight: number;
  isValid: boolean;
  amount: AmountObjectValue;
}

export class ReportPositionEntity extends Entity<Attributes> {
  private id: string;
  private name: string;
  private count: number;
  private code: number;
  private weight: number;
  private isValid: boolean;
  private amount: AmountObjectValue;
  constructor(attributes: Attributes) {
    super();
    this.id = attributes.id;
    this.name = attributes.name;
    this.count = attributes.count;
    this.code = attributes.code;
    this.weight = attributes.weight;
    this.isValid = attributes.isValid;
    this.amount = attributes.amount;
  }

  priceOfOnePosition(): number {
    return this.amount.getAmoutWithoutTax() / this.count;
  }

  getPriceWithTax(): number {
    return this.priceOfOnePosition() + this.getValueOfTax();
  }

  hasNegativeDifferenceAfterTax(): boolean {
    return this.amount.differenceAfterTax() < 0;
  }

  getValueOfTax(): number {
    return this.amount.differenceAfterTax();
  }

  updatePositionDiscount(discount: number): void {
    this.amount = new AmountObjectValue({
      amount: this.amount.applyDiscount(discount),
      rate: this.amount.rate,
    });
  }

  updateTaxRate(newTaxRate: number): void {
    this.amount = new AmountObjectValue({
      amount: this.amount.amount,
      rate: newTaxRate,
    });
  }

  getSumWithoutRate(): number {
    return this.amount.getAmoutWithoutTax();
  }

  getWeightOfOnePostition(): number {
    return this.weight / this.count;
  }

  hasEmptyRate(): boolean {
    if (this.amount.differenceAfterTax() === 0) {
      return true;
    }
    return false;
  }
}

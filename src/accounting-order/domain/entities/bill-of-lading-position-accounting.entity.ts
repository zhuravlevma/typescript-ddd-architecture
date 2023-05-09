import { SumObjectValue } from '../object-values/sum.object-value';

interface Attributes {
  id: string;
  name: string;
  count: number;
  code: number;
  weight: number;
  orderId: string;
  amount: number;
  isValid: boolean;
  sum: SumObjectValue;
}

export class BillOfLadingPositionEntity implements Attributes {
  id: string;
  name: string;
  count: number;
  code: number;
  weight: number;
  orderId: string;
  amount: number;
  isValid: boolean;
  sum: SumObjectValue;

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.count = attributes.count;
    this.code = attributes.code;
    this.weight = attributes.weight;
    this.orderId = attributes.orderId;
    this.amount = attributes.amount;
    this.isValid = attributes.isValid;
    this.sum = attributes.sum;
  }

  priceOfOnePosition() {
    return this.sum.sumWithoutRate / this.amount;
  }

  getTotalSum() {
    return this.sum.totalSum;
  }

  getValueOfRate() {
    return this.sum.difference();
  }

  positionIsValid() {
    return this.isValid;
  }
}

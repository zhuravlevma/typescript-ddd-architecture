import { SumObjectValue } from '../object-values/sum.object-value';

interface Attributes {
  id: string;
  name: string;
  count: number;
  code: number;
  weight: number;
  amount: number;
  sum: SumObjectValue;
}

export class BillOfLadingPositionEntity implements Attributes {
  id: string;
  name: string;
  count: number;
  code: number;
  weight: number;
  amount: number;
  sum: SumObjectValue;

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.count = attributes.count;
    this.code = attributes.code;
    this.weight = attributes.weight;
    this.amount = attributes.amount;
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
}

import { SumObjectValue } from '../object-values/sum.object-value';

interface Attributes {
  id: string;
  name: string;
  count: number;
  code: number;
  weight: number;
  sum: SumObjectValue;
}

export class ReportPositionEntity implements Attributes {
  id: string;
  name: string;
  count: number;
  code: number;
  weight: number;
  sum: SumObjectValue;

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.count = attributes.count;
    this.code = attributes.code;
    this.weight = attributes.weight;
    this.sum = attributes.sum;
  }

  priceOfOnePosition() {
    return this.sum.sumWithoutRate / this.count;
  }

  getTotalSum() {
    return this.sum.totalSum;
  }

  getValueOfRate() {
    return this.sum.difference();
  }

  getSumWithoutRate() {
    return this.sum.sumWithoutRate;
  }

  getWeightOfOnePostition() {
    return this.weight / this.count;
  }

  hasEmptyRate(): boolean {
    if (this.sum.difference() === 0) {
      return true;
    }
    return false;
  }
}

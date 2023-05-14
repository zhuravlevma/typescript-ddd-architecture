export class SumObjectValue {
  sumWithoutRate: number;
  totalSum: number;
  rate: number;

  constructor(sum: number, rate: number) {
    this.totalSum = sum;
    this.sumWithoutRate = sum * (100 - rate);
    this.rate = rate;
  }

  difference(): number {
    return this.totalSum - this.sumWithoutRate;
  }
}

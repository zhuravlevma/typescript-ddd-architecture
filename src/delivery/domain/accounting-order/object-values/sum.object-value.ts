export class SumObjectValue {
  sumWithRate: number;
  sumWithoutRate: number;
  rate: number;

  constructor(sum: number, rate: number) {
    this.sumWithoutRate = sum;
    this.sumWithRate = sum * (100 - rate);
    this.rate = rate;
  }

  difference(): number {
    return this.sumWithoutRate - this.sumWithRate;
  }
}

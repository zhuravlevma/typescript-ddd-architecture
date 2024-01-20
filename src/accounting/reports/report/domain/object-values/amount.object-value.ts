export class AmountObjectValue {
  amount: number;
  rate: number;

  constructor(amount: number, rate: number) {
    this.amount = amount;
    this.rate = rate;
  }

  applyDiscount(discount) {
    this.amount *= discount;
  }

  getAmoutWithoutTax(): number {
    return this.amount * (100 - this.rate);
  }

  differenceAfterTax(): number {
    return this.amount - this.getAmoutWithoutTax();
  }

  updateTaxRate(rate: number) {
    this.rate = rate;
  }
}

import { SumObjectValue } from '../object-values/sum.object-value';

export class BillOfLadingPositionAccountingEntity {
  id: string;
  name: string;
  count: number;
  code: number;
  weight: number;
  orderId: string;
  amount: number;
  isValid: boolean;
  sum: SumObjectValue;

  constructor(
    id: string,
    name: string,
    count: number,
    code: number,
    weight: number,
    orderId: string,
    amount: number,
    isValid: boolean,
    sum: SumObjectValue,
  ) {
    this.id = id;
    this.name = name;
    this.count = count;
    this.code = code;
    this.weight = weight;
    this.orderId = orderId;
    this.amount = amount;
    this.isValid = isValid;
    this.sum = sum;
  }

  positionIsValid() {
    return this.isValid;
  }
}

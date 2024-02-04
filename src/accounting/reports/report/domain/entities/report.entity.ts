import { ReportPositionEntity } from './report-position.entity';
import { ReportValidatedEvent } from '../events/report-validated.event';
import { Aggregate } from 'src/__lib__/aggregate';

interface Attributes {
  id: string;
  isValid: boolean;
  orderId: string;
  reportNumber: number;
  positions: ReportPositionEntity[];
}

export class ReportEntity extends Aggregate<Attributes> {
  constructor(attributes: Attributes) {
    super(attributes);
  }

  get isValid() {
    return this.__data.isValid;
  }

  updateReportStatus(status: boolean) {
    if (status === true) {
      this.__data.isValid = true;
      this.addMessage(
        new ReportValidatedEvent({
          aggregateId: this.__data.id,
          correlationId: 'id',
          payload: { orderId: this.__data.orderId },
        }),
      );
    } else {
      this.__data.isValid = false;
    }
  }

  applyReport(): void {
    if (this.getTotalAmountWithTax() > 10000) {
      this.updateReportStatus(true);
    }

    this.__data.positions.forEach((position) => {
      if (position.getWeightOfOnePostition() > 5) {
        position.updatePositionDiscount(0.1);
      }
    });
  }

  getTaxAmount(): number {
    return this.__data.positions.reduce(
      (totalTax, position) => totalTax + position.getValueOfTax(),
      0,
    );
  }

  getPositionsAboveTaxThreshold(threshold: number): ReportPositionEntity[] {
    return this.__data.positions.filter(
      (position) => position.getValueOfTax() > threshold,
    );
  }

  getTotalAmountWithTax(): number {
    return this.__data.positions.reduce(
      (totalAmount, position) => totalAmount + position.getPriceWithTax(),
      0,
    );
  }
}

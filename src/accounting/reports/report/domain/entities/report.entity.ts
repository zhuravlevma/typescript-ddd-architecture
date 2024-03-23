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
  private id: string;
  public isValid: boolean;
  private orderId: string;
  private reportNumber: number;
  private positions: ReportPositionEntity[];

  constructor(attributes: Attributes) {
    super();
    this.id = attributes.id;
    this.isValid = attributes.isValid;
    this.orderId = attributes.orderId;
    this.reportNumber = attributes.reportNumber;
    this.positions = attributes.positions;
  }

  updateReportStatus(status: boolean) {
    if (status === true) {
      this.isValid = true;
      this.addMessage(
        new ReportValidatedEvent({
          aggregateId: this.id,
          payload: { orderId: this.orderId },
        }),
      );
    } else {
      this.isValid = false;
    }
  }

  applyReport(): void {
    if (this.getTotalAmountWithTax() > 10000) {
      this.updateReportStatus(true);
    }

    this.positions.forEach((position) => {
      if (position.getWeightOfOnePostition() > 5) {
        position.updatePositionDiscount(0.1);
      }
    });
  }

  getTaxAmount(): number {
    return this.positions.reduce((totalTax, position) => totalTax + position.getValueOfTax(), 0);
  }

  getPositionsAboveTaxThreshold(threshold: number): ReportPositionEntity[] {
    return this.positions.filter((position) => position.getValueOfTax() > threshold);
  }

  getTotalAmountWithTax(): number {
    return this.positions.reduce((totalAmount, position) => totalAmount + position.getPriceWithTax(), 0);
  }
}

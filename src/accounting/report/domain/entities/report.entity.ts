import { ReportPositionEntity } from './report-position.entity';
import { ReportValidatedEvent } from '../events/report-validated.event';
import { DomainEvent } from 'src/__relay__/domain-event';

interface Attributes {
  id: string;
  isValid: boolean;
  orderId: string;
  positions: ReportPositionEntity[];
}

export class ReportEntity implements Attributes {
  readonly id: string;
  private _isValid: boolean;
  readonly orderId: string;
  readonly positions: ReportPositionEntity[];
  readonly events: DomainEvent[];

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this._isValid = attributes.isValid;
    this.orderId = attributes.orderId;
    this.positions = attributes.positions;
    this.events = [];
  }

  get isValid() {
    return this._isValid;
  }

  updateReportStatus(status: boolean) {
    if (status === true) {
      this._isValid = true;
      this.events.push(
        new ReportValidatedEvent({
          reason: 'report validated',
          payload: { orderId: this.orderId },
        }),
      );
    } else {
      this._isValid = false;
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
    return this.positions.reduce(
      (totalTax, position) => totalTax + position.getValueOfTax(),
      0,
    );
  }

  getPositionsAboveTaxThreshold(threshold: number): ReportPositionEntity[] {
    return this.positions.filter(
      (position) => position.getValueOfTax() > threshold,
    );
  }

  getTotalAmountWithTax(): number {
    return this.positions.reduce(
      (totalAmount, position) => totalAmount + position.getPriceWithTax(),
      0,
    );
  }
}

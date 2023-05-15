import { DomainEvent } from 'src/__relay__/domain-event';
import { BillOfLadingPositionEntity } from './bill-of-lading-position-accounting.entity';
import { ReportValidatedEvent } from '../events/report-validated.event';

interface Attributes {
  id: string;
  isValid: boolean;
  orderId: string;
  positions: BillOfLadingPositionEntity[];
}

export class BillOfLadingReportEntity implements Attributes {
  id: string;
  isValid: boolean;
  orderId: string;
  positions: BillOfLadingPositionEntity[];
  events: DomainEvent[];

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.isValid = attributes.isValid;
    this.orderId = attributes.orderId;
    this.positions = attributes.positions;
    this.events = [];
  }

  updateReportStatus(status: boolean) {
    if (status === true) {
      this.isValid = true;
      this.events.push(
        new ReportValidatedEvent({
          id: this.id,
          reason: 'report validated',
          type: 'report-validated',
          payload: new Map([['orderId', this.orderId]]),
        }),
      );
    } else {
      this.isValid = false;
    }
  }
}

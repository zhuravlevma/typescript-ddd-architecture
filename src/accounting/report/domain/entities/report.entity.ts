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
  id: string;
  isValid: boolean;
  orderId: string;
  positions: ReportPositionEntity[];
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
          reason: 'report validated',
          payload: { orderId: this.orderId },
        }),
      );
    } else {
      this.isValid = false;
    }
  }
}

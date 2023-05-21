import { DomainEvent } from 'src/__relay__/domain-event';
import { ReportPositionEntity } from './report-position.entity';
import { ReportValidatedEvent } from '../events/report-validated.event';

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

  getTotalSumOfpositions(): number {
    let sum = 0;
    this.positions.forEach((position) => {
      sum += position.getTotalSum();
    });
    return sum;
  }

  getValuesOfRateForPositions() {
    let sum = 0;
    this.positions.forEach((position) => {
      sum += position.getValueOfRate();
    });
    return sum;
  }

  getSumWithoutRateForPositions() {
    let sum = 0;
    this.positions.forEach((position) => {
      sum += position.getSumWithoutRate();
    });
    return sum;
  }

  getCountPositionsWithEmptyRate() {
    let count = 0;
    this.positions.forEach((position) => {
      if (position.hasEmptyRate()) count += 1;
    });
    return count;
  }

  getAverageOfWeightForOnePositionOfOrder() {
    let totalWeight = 0;
    this.positions.forEach((position) => {
      totalWeight += position.getWeightOfOnePostition();
    });
    return totalWeight / this.positions.length;
  }
}

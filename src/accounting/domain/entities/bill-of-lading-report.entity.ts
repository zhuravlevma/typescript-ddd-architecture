import { BillOfLadingPositionEntity } from './bill-of-lading-position-accounting.entity';

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

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.isValid = attributes.isValid;
    this.orderId = attributes.orderId;
    this.positions = attributes.positions;
  }
}

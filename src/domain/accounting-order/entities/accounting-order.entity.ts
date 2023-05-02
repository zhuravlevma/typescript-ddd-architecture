import { BillOfLadingPositionAccountingEntity } from './bill-of-lading-position-accounting.entity';

interface Attributes {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  deliverymanId: string;
  billOfLadingPositions: BillOfLadingPositionAccountingEntity[];
}

export class AccountingOrderEntity implements Attributes {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  deliverymanId: string;
  billOfLadingPositions: BillOfLadingPositionAccountingEntity[];

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.isActive = attributes.isActive;
    this.deliverymanId = attributes.deliverymanId;
    this.billOfLadingPositions = attributes.billOfLadingPositions;
  }

  addInfoToDescription(info: string) {
    this.description += '\nInfo from the Accounting department' + info;
  }
}

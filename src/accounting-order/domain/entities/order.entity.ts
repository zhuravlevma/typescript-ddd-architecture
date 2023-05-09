import { BillOfLadingPositionEntity } from './bill-of-lading-position-accounting.entity';

interface Attributes {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  deliverymanId: string;
  billOfLadingPositions: BillOfLadingPositionEntity[];
}

export class OrderEntity implements Attributes {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  deliverymanId: string;
  billOfLadingPositions: BillOfLadingPositionEntity[];

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

import { BillOfLadingPositionAccountingEntity } from './bill-of-lading-position-accounting.entity';

export class AccountingOrderEntity {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  deliverymanId: string;
  billOfLadingPostions: BillOfLadingPositionAccountingEntity[];

  constructor(
    id: string,
    name: string,
    description: string,
    isActive: boolean,
    deliverymanId: string,
    billOfLadingPostions: BillOfLadingPositionAccountingEntity[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isActive = isActive;
    this.deliverymanId = deliverymanId;
    this.billOfLadingPostions = billOfLadingPostions;
  }

  addInfoToDescription(info: string) {
    this.description += '\nInfo from the Accounting department' + info;
  }
}

export class AccountingOrderEntity {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  deliverymanId: string;

  constructor(
    id: string,
    name: string,
    description: string,
    isActive: boolean,
    deliverymanId: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isActive = isActive;
    this.deliverymanId = deliverymanId;
  }

  addInfoToDescription(info: string) {
    this.description += '\n' + info;
  }
}

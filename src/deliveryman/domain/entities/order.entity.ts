import { BillOfLadingPositionEntity } from './bill-of-lading-position.entity';

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

    this.checkName();
  }

  checkName() {
    if (this.name.length < 3) {
      throw new Error('The length of the name is less than 3');
    }
  }

  changeStatus(newStatus: boolean) {
    if (newStatus === true) {
      this.deliver();
    } else {
      this.return();
    }
  }

  addInfoToDescription(info: string) {
    this.description += '\n' + info;
  }

  return() {
    this.addInfoToDescription('This order has been returned :(');
  }

  deliver() {
    if (!this.orderIsValid()) {
      throw new Error('This order contains an invalid item');
    }
    this.isActive = false;
    this.addInfoToDescription('This order has been delivered.');
  }

  orderIsValid() {
    if (this.billOfLadingPositions.length === 0) {
      throw new Error('This order does not contain a bill of lading');
    }
    const postionsWithStatusOfInvalid = this.billOfLadingPositions.filter(
      (position) => position.positionIsValid() === false,
    );
    if (postionsWithStatusOfInvalid.length !== 0) {
      return false;
    }
    return true;
  }
}

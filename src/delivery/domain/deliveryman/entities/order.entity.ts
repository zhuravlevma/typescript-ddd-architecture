import { BillOfLadingPositionEntity } from './bill-of-lading-position.entity';

export class OrderEntity {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  deliverymanId: string;
  billOfLadingPostion: BillOfLadingPositionEntity[];

  constructor(
    id: string,
    name: string,
    description: string,
    isActive: boolean,
    deliverymanId: string,
    billOfLadingPostion: BillOfLadingPositionEntity[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isActive = isActive;
    this.deliverymanId = deliverymanId;
    this.billOfLadingPostion = billOfLadingPostion;
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
    if (this.billOfLadingPostion.length === 0) {
      throw new Error('This order does not contain a bill of lading');
    }
    const postionsWithStatusOfInvalid = this.billOfLadingPostion.filter(
      (position) => position.positionIsValid() === false,
    );
    if (postionsWithStatusOfInvalid.length !== 0) {
      return false;
    }
    return true;
  }
}

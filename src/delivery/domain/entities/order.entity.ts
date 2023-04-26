export class OrderEntity {
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
    this.isActive = false;
    this.addInfoToDescription('This order has been delivered.');
  }
}

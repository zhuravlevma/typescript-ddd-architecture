interface Attributes {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  deliverymanId: string;
  orderId: string;
}
export class OrderEntity implements Attributes {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  deliverymanId: string;
  orderId: string;

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.isActive = attributes.isActive;
    this.deliverymanId = attributes.deliverymanId;
    this.orderId = attributes.orderId;
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

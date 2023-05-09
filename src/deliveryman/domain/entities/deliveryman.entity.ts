import { OrderEntity } from './order.entity';

interface Attributes {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  orders: OrderEntity[];
}

export class DeliverymanEntity implements Attributes {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  orders: OrderEntity[];

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.firstName = attributes.firstName;
    this.lastName = attributes.lastName;
    this.isActive = attributes.isActive;
    this.orders = attributes.orders;
  }

  addOrder(order: OrderEntity) {
    if (this.orders.length > 3) {
      throw new Error('Exceeded the number of orders');
    }
    this.orders.push(order);
  }

  deliverOrders() {
    for (const order of this.orders) {
      order.deliver();
    }
  }

  changeStatus(newStatus: boolean) {
    if (
      this.isActive === true &&
      newStatus === false &&
      this.orders.length > 0
    ) {
      throw new Error('Deliverman has orders');
    }
    this.isActive = newStatus;
  }

  addNewMessageToOrders(message: string) {
    for (const order of this.orders) {
      order.addInfoToDescription(`
		${message}
		${this.firstName} ${this.lastName}
  	  `);
    }
  }
}

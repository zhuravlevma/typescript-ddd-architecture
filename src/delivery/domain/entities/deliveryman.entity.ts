import { OrderEntity } from './order.entity';

export class DeliverymanEntity {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  orders: OrderEntity[];

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    isActive: boolean,
    orders?: OrderEntity[],
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
    this.orders = orders;
  }

  addOrder(order: OrderEntity) {
    if (this.orders.length > 3) {
      throw new Error('Exceeded the number of orders');
    }
    this.orders.push(order);
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

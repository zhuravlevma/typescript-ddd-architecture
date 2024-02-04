import { OrderEntity } from './order.entity';
import { Aggregate } from '../../../../../__lib__/aggregate';

interface Attributes {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  email: string;
  phone: number;
  vehicleType: string;
  workingHours: number;
  rating: number;
  deliveryCapacity: number;
  specialization: string;
  commissionRate: number;
  paymentDetails: number;
  orders: OrderEntity[];
}

export class CurierEntity extends Aggregate<Attributes> {
  constructor(attributes: Attributes) {
    super(attributes);
  }

  addOrder(order: OrderEntity) {
    if (this.__data.orders.length > 3) {
      throw new Error('Exceeded the number of orders');
    }
    this.__data.orders.push(order);
  }

  changeFirstName(firstName: string) {
    this.__data.firstName = firstName;
  }

  changeLastName(lastName: string) {
    this.__data.lastName = lastName;
  }

  updateRating(newRating: number): void {
    const totalRating = this.__data.rating * this.__data.orders.length;
    const updatedRating =
      (totalRating + newRating) / (this.__data.orders.length + 1);
    this.__data.rating = updatedRating;
  }

  setDeliveryCapacity(capacity: number): void {
    if (this.__data.orders.some((order) => order.weight > capacity)) {
      throw new Error('Delivery capacity is insufficient for existing orders.');
    }
    this.__data.deliveryCapacity = capacity;
  }

  changeSpecialization(area: string): void {
    this.__data.specialization = area;
  }

  setCommissionRate(rate: number): void {
    if (rate > 0.5) {
      throw new Error('Commission rate cannot exceed 50%.');
    }
    this.__data.commissionRate = rate;
  }

  updatePaymentDetails(bankAddress: number): void {
    if (this.__data.orders.some((order) => order.isActive === false)) {
      throw new Error(
        'Cannot update payment details for orders with pending payment.',
      );
    }
    this.__data.paymentDetails = bankAddress;
  }

  deliverOrder(orderId: string): void {
    const order = this.__data.orders.find((order) => order.id === orderId);
    if (order) {
      order.deliverOrder();
    }
  }

  completeDeliveryForOrderId(orderId: string): void {
    const completedOrder = this.__data.orders.find(
      (order) => order.id === orderId,
    );
    if (completedOrder) {
      completedOrder.deliverOrder();
    }
  }

  completeDeliveryForAllOrders() {
    for (const order of this.__data.orders) {
      order.deliverOrder();
    }
  }

  changeStatus(newStatus: boolean) {
    if (
      this.__data.isActive === true &&
      newStatus === false &&
      this.__data.orders.length > 0
    ) {
      throw new Error('Deliverman has orders');
    }
    this.__data.isActive = newStatus;
  }

  addNewMessageToOrders(message: string) {
    for (const order of this.__data.orders) {
      order.addInfoToDescription(`
		${message}
		${this.__data.firstName} ${this.__data.lastName}
  	  `);
    }
  }
}

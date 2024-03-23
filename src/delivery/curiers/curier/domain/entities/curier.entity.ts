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
  private id: string;
  private firstName: string;
  private lastName: string;
  private isActive: boolean;
  private email: string;
  private phone: number;
  private vehicleType: string;
  private workingHours: number;
  private rating: number;
  private deliveryCapacity: number;
  private specialization: string;
  private commissionRate: number;
  private paymentDetails: number;
  private orders: OrderEntity[];
  constructor(attributes: Attributes) {
    super();
    this.id = attributes.id;
    this.firstName = attributes.firstName;
    this.lastName = attributes.lastName;
    this.isActive = attributes.isActive;
    this.email = attributes.email;
    this.phone = attributes.phone;
    this.vehicleType = attributes.vehicleType;
    this.workingHours = attributes.workingHours;
    this.rating = attributes.rating;
    this.deliveryCapacity = attributes.deliveryCapacity;
    this.specialization = attributes.specialization;
    this.commissionRate = attributes.commissionRate;
    this.paymentDetails = attributes.paymentDetails;
    this.orders = attributes.orders;
  }

  addOrder(order: OrderEntity) {
    if (this.orders.length > 3) {
      throw new Error('Exceeded the number of orders');
    }
    this.orders.push(order);
  }

  changeFirstName(firstName: string) {
    this.firstName = firstName;
  }

  changeLastName(lastName: string) {
    this.lastName = lastName;
  }

  updateRating(newRating: number): void {
    const totalRating = this.rating * this.orders.length;
    const updatedRating = (totalRating + newRating) / (this.orders.length + 1);
    this.rating = updatedRating;
  }

  setDeliveryCapacity(capacity: number): void {
    if (this.orders.some((order) => order.Weight > capacity)) {
      throw new Error('Delivery capacity is insufficient for existing orders.');
    }
    this.deliveryCapacity = capacity;
  }

  changeSpecialization(area: string): void {
    this.specialization = area;
  }

  setCommissionRate(rate: number): void {
    if (rate > 0.5) {
      throw new Error('Commission rate cannot exceed 50%.');
    }
    this.commissionRate = rate;
  }

  updatePaymentDetails(bankAddress: number): void {
    if (this.orders.some((order) => order.IsActive === false)) {
      throw new Error(
        'Cannot update payment details for orders with pending payment.',
      );
    }
    this.paymentDetails = bankAddress;
  }

  deliverOrder(orderId: string): void {
    const order = this.orders.find((order) => order.Id === orderId);
    if (order) {
      order.deliverOrder();
    }
  }

  completeDeliveryForOrderId(orderId: string): void {
    const completedOrder = this.orders.find((order) => order.Id === orderId);
    if (completedOrder) {
      completedOrder.deliverOrder();
    }
  }

  completeDeliveryForAllOrders() {
    for (const order of this.orders) {
      order.deliverOrder();
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

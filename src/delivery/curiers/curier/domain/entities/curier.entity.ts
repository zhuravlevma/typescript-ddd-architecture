import { OrderEntity } from './order.entity';

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

export class CurierEntity implements Attributes {
  readonly id: string;
  firstName: string;
  lastName: string;
  readonly email: string;
  readonly phone: number;
  private _isActive: boolean;
  readonly vehicleType: string;
  readonly workingHours: number;
  private _rating: number;
  private _deliveryCapacity: number;
  private _specialization: string;
  private _commissionRate: number;
  private _paymentDetails: number;
  readonly orders: OrderEntity[];

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.firstName = attributes.firstName;
    this.lastName = attributes.lastName;
    this._isActive = attributes.isActive;
    this.email = attributes.email;
    this.vehicleType = attributes.vehicleType;
    this.workingHours = attributes.workingHours;
    this._rating = attributes.rating;
    this._deliveryCapacity = attributes.deliveryCapacity;
    this._specialization = attributes.specialization;
    this._commissionRate = attributes.commissionRate;
    this._paymentDetails = attributes.paymentDetails;
    this.phone = attributes.phone;
    this.orders = attributes.orders;
  }

  addOrder(order: OrderEntity) {
    if (this.orders.length > 3) {
      throw new Error('Exceeded the number of orders');
    }
    this.orders.push(order);
  }

  get commissionRate() {
    return this._commissionRate;
  }

  get isActive() {
    return this._isActive;
  }

  get paymentDetails() {
    return this._paymentDetails;
  }

  get rating() {
    return this._rating;
  }

  get deliveryCapacity() {
    return this._deliveryCapacity;
  }

  get specialization() {
    return this._specialization;
  }

  updateRating(newRating: number): void {
    const totalRating = this.rating * this.orders.length;
    const updatedRating = (totalRating + newRating) / (this.orders.length + 1);
    this._rating = updatedRating;
  }

  setDeliveryCapacity(capacity: number): void {
    if (this.orders.some((order) => order.weight > capacity)) {
      throw new Error('Delivery capacity is insufficient for existing orders.');
    }
    this._deliveryCapacity = capacity;
  }

  changeSpecialization(area: string): void {
    this._specialization = area;
  }

  setCommissionRate(rate: number): void {
    if (rate > 0.5) {
      throw new Error('Commission rate cannot exceed 50%.');
    }
    this._commissionRate = rate;
  }

  updatePaymentDetails(bankAddress: number): void {
    if (this.orders.some((order) => order.isActive === false)) {
      throw new Error(
        'Cannot update payment details for orders with pending payment.',
      );
    }
    this._paymentDetails = bankAddress;
  }

  deliverOrder(orderId: string): void {
    const order = this.orders.find((order) => order.id === orderId);
    if (order) {
      order.deliverOrder();
    }
  }

  completeDeliveryForOrderId(orderId: string): void {
    const completedOrder = this.orders.find((order) => order.id === orderId);
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
    this._isActive = newStatus;
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

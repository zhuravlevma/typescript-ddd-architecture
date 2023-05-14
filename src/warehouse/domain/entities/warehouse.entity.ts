import { DomainEvent } from 'src/__lib__/domain-event';
import { OrderEntity } from './order.entity';

interface Attributes {
  id: string;
  name: string;
  orders: OrderEntity[];
}

export class WarehouseEntity implements Attributes {
  id: string;
  name: string;
  orders: OrderEntity[];

  constructor(attributes: Attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.orders = attributes.orders;
  }

  addOrder(order: OrderEntity) {
    this.orders.push(order);
  }

  changeOrderStatusToValid(orderId: string) {
    const order = this.orders.find((el) => el.id === orderId);
    order.changeStatus(true);
  }

  getUnpublishedEvents(): DomainEvent[] {
    return this.orders.map((order) => order.domainEvents).flat(1);
  }
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './orders.model';

@Entity('deliverymans')
export class Deliveryman {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => Order, (order) => order.deliveryman, {
    cascade: ['insert', 'update'],
  })
  orders: Order[];

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  addOrder(order: Order) {
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

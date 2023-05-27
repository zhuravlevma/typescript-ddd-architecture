import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderOrmEntity } from './orders.orm-entity';

@Entity('deliverymans', { schema: 'delivery' })
export class DeliverymanOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'bool', default: false })
  isActive: boolean;

  @OneToMany(() => OrderOrmEntity, (order) => order.deliveryman, {
    cascade: ['insert', 'update'],
  })
  orders: OrderOrmEntity[];
}

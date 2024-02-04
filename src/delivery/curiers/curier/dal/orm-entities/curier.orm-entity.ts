import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderOrmEntity } from './orders.orm-entity';

@Entity('curiers', { schema: 'delivery' })
export class CurierOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'bool', default: false })
  isActive: boolean;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  vehicleType: string;

  @Column()
  workingHours: number;

  @Column()
  rating: number;

  @Column()
  deliveryCapacity: number;

  @Column()
  specialization: string;

  @Column()
  commissionRate: number;

  @Column()
  paymentDetails: number;

  @OneToMany(() => OrderOrmEntity, (order) => order.curier, {
    cascade: ['insert', 'update'],
  })
  orders: OrderOrmEntity[];
}

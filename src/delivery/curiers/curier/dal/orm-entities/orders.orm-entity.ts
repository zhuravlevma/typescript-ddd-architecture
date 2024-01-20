import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DeliverymanOrmEntity } from './deliveryman.orm-entity';

@Entity('orders', { schema: 'delivery' })
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  orderId: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @Column()
  deliverymanId: string;

  @Column()
  totalSum: number;

  @Column()
  weight: number;

  @ManyToOne(() => DeliverymanOrmEntity, (deliveryMan) => deliveryMan.orders)
  @JoinColumn({ name: 'deliverymanId', referencedColumnName: 'id' })
  deliveryman: DeliverymanOrmEntity;
}

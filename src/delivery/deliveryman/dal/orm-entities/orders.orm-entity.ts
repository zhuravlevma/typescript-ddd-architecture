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

  @ManyToOne(() => DeliverymanOrmEntity, (deliveryMan) => deliveryMan.orders)
  @JoinColumn({ name: 'deliverymanId', referencedColumnName: 'id' })
  deliveryman: DeliverymanOrmEntity;
}

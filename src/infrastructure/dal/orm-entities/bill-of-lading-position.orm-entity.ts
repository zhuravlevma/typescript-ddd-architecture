import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderOrmEntity } from './orders.orm-entity';

@Entity('bill_of_ladings')
export class BillOfLadingPositionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  count: number;

  @Column()
  code: number;

  @Column()
  weight: number;

  @Column()
  orderId: string;

  @Column()
  amount: number;

  @Column()
  sum: number;

  @Column()
  rate: number;

  @Column()
  isValid: boolean;

  @ManyToOne(() => OrderOrmEntity, (order) => order.billOfLadingPositions)
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  order: OrderOrmEntity;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CurierOrmEntity } from './curier.orm-entity';

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
  curierId: string;

  @Column()
  totalSum: number;

  @Column()
  weight: number;

  @ManyToOne(() => CurierOrmEntity, (curier) => curier.orders)
  @JoinColumn({ name: 'curierId', referencedColumnName: 'id' })
  curier: CurierOrmEntity;
}

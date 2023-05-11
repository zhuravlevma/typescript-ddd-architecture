import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BillOfLadingReportOrmEntity } from './bill-of-lading-report.orm-entity';
import { OrderOrmEntity } from 'src/deliveryman/dal/orm-entities/orders.orm-entity';

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
  reportId: string;

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

  @ManyToOne(() => BillOfLadingReportOrmEntity, (report) => report.positions)
  @JoinColumn({ name: 'reportId', referencedColumnName: 'id' })
  report: BillOfLadingReportOrmEntity;
}

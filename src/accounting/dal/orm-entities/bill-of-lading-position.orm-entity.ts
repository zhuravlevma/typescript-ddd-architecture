import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BillOfLadingReportOrmEntity } from './bill-of-lading-report.orm-entity';

@Entity('bill_of_ladings_positions', { schema: 'accounting' })
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
  reportId: string;

  @Column()
  amount: number;

  @Column()
  sum: number;

  @Column()
  rate: number;

  @Column()
  isValid: boolean;

  @ManyToOne(() => BillOfLadingReportOrmEntity, (report) => report.positions)
  @JoinColumn({ name: 'reportId', referencedColumnName: 'id' })
  report: BillOfLadingReportOrmEntity;
}

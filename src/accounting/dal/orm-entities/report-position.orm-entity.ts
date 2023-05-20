import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ReportOrmEntity } from './report.orm-entity';

@Entity('reports_positions', { schema: 'accounting' })
export class ReportPositionOrmEntity {
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

  @ManyToOne(() => ReportOrmEntity, (report) => report.positions)
  @JoinColumn({ name: 'reportId', referencedColumnName: 'id' })
  report: ReportOrmEntity;
}

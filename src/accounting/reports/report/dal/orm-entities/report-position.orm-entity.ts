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

  @Column({ type: 'integer' })
  count: number;

  @Column({ type: 'integer' })
  code: number;

  @Column({ type: 'integer' })
  weight: number;

  @Column({ type: 'uuid' })
  reportId: string;

  @Column({ type: 'integer' })
  sum: number;

  @Column({ type: 'integer' })
  rate: number;

  @Column({ type: 'bool' })
  isValid: boolean;

  @ManyToOne(() => ReportOrmEntity, (report) => report.positions)
  @JoinColumn({ name: 'reportId', referencedColumnName: 'id' })
  report: ReportOrmEntity;
}

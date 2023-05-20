import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ReportPositionOrmEntity } from './report-position.orm-entity';

@Entity('reports', { schema: 'accounting' })
export class ReportOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isValid: boolean;

  @Column()
  orderId: string;

  @OneToMany(() => ReportPositionOrmEntity, (position) => position.report, {
    cascade: ['insert', 'update'],
  })
  positions: ReportPositionOrmEntity[];
}

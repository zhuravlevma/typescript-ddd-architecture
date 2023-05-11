import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BillOfLadingPositionOrmEntity } from './bill-of-lading-position.orm-entity';

@Entity('bill_of_ladings_report')
export class BillOfLadingReportOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isValid: boolean;

  @OneToMany(
    () => BillOfLadingPositionOrmEntity,
    (position) => position.report,
    {
      cascade: ['insert', 'update'],
    },
  )
  positions: BillOfLadingPositionOrmEntity[];
}

import { IsNumber } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('verifications', { schema: 'accounting' })
export class Verification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bool' })
  isFull: boolean;

  @Column({ type: 'bool' })
  completed: boolean;

  @Column({ type: 'bool' })
  signed: boolean;

  @IsNumber()
  reportNumber: number;

  @Column({ type: 'uuid' })
  reportId: string;
}

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

  signReport() {
    if (this.completed) {
      throw new Error('Cannot sign a report that has already been completed.');
    }

    this.signed = true;
  }

  completeVerification() {
    if (!this.signed) {
      throw new Error('Cannot complete verification without signing the report.');
    }

    if (this.reportNumber < 0) {
      throw new Error('Report number cannot be negative.');
    }

    this.completed = true;
  }
}

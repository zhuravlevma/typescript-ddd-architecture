import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Saga } from './saga.model';
import { Compensation } from './compensation.model';

@Entity('saga_steps')
export class SagaStep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Saga, (saga) => saga.steps)
  @JoinColumn({ name: 'sagaId' })
  saga: Saga;

  @Column()
  stepName: string;

  @Column()
  status: string; // Pending, Completed, Failed

  @Column({ name: 'is_final', type: 'bool', default: false })
  isFinal: boolean;

  @CreateDateColumn()
  startedAt: Date;

  @UpdateDateColumn()
  completedAt: Date;

  @Column({ nullable: true })
  errorMessage: string;

  @Column({ default: 0 })
  retries: number;

  @OneToMany(() => Compensation, (compensation) => compensation.sagaStep, {
    cascade: ['insert', 'update'],
  })
  compensations: Compensation[];

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;
}

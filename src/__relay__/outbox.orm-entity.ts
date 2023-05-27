import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('outbox')
export class OutboxOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'text' })
  reason: string;

  @Column({
    type: 'jsonb',
    default: {},
  })
  payload: any;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @Column({ type: 'bool', default: false })
  published: boolean;
}

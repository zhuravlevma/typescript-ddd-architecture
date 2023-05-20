import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'bool', default: false })
  publushed: boolean;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('outbox', { schema: 'delivery' })
export class OutboxOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  domainId: string;

  @Column()
  type: string;

  @Column()
  reason: string;

  @Column({
    type: 'jsonb',
    default: {},
  })
  payload: any;

  @Column({ default: false })
  publushed: boolean;
}

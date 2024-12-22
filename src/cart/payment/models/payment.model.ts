import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payments', { schema: 'cart' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bool' })
  completed: boolean;

  @Column({ type: 'uuid' })
  orderId: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  correlationId: string;
}

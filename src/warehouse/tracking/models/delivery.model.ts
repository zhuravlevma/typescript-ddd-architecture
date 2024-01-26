import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('deliveries', { schema: 'warehouse' })
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startLatitude: string | null;

  @Column()
  startLongitude: string | null;

  @Column()
  endLatitude: string | null;

  @Column()
  endLongitude: string | null;

  @Column({ type: 'bool' })
  completed: boolean;

  @Column({ type: 'uuid' })
  orderId: string;

  @Column({ type: 'uuid' })
  truckId: string;

  @Column({ type: 'uuid' })
  targetPickUpPoint: string;
}

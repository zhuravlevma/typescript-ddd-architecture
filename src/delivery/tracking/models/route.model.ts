import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('routes', { schema: 'delivery' })
export class Route {
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
  courierId: string;
}

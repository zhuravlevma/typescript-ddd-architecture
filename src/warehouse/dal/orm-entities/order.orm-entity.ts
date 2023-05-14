import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders', {
  schema: 'warehouse',
})
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  isValid: boolean;
}

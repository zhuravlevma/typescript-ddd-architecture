import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('warehouse', {
  schema: 'warehouse',
})
export class WarehouseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}

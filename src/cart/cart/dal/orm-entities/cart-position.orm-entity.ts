import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CartOrmEntity } from './cart.orm-entity';

@Entity('cart_positions', { schema: 'cart' })
export class CartPositionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'integer' })
  code: number;

  @Column({ type: 'uuid' })
  cartId: string;

  @Column({ type: 'integer' })
  sum: number;

  @ManyToOne(() => CartOrmEntity, (cart) => cart.positions)
  @JoinColumn({ name: 'cartId', referencedColumnName: 'id' })
  cart: CartOrmEntity;
}

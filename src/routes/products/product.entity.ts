import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
    JoinTable
} from "typeorm";

import { Variant } from "./variant.entity";
import { User } from "../users/user.entity";


@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provider: string;

  @Column({ nullable: true })
  pid?: string;

  @Column({ nullable: true })
  sku?: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ type: 'jsonb', nullable: true })
  imageSet?: any;

  @ManyToMany(() => User, (user) => user.products)
  @JoinTable({
    name: 'product_owners',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  owners: User[];

  @OneToMany(() => Variant, (v) => v.product)
  variants: Variant[];
}

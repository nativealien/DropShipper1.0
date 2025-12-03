import { 
    Column, 
    Entity, 
    JoinColumn, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { User } from "../users/user.entity";
import { Product } from "../products/product.entity";


@Entity('storefronts')
export class Storefront {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.storefronts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => Product, (product) => product.storefronts)
  @JoinTable({
    name: 'storefront_products',
    joinColumn: { name: 'storefront_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];
}
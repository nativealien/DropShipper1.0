import { 
    Entity, 
    Column, 
    ManyToMany, 
    PrimaryGeneratedColumn,
    OneToMany 
} from "typeorm";

import { Storefront } from "../storefronts/storefront.entity";
import { Variant } from "./variant.entity";


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

  @ManyToMany(() => Storefront, (s) => s.products)
  storefronts: Storefront[];

  @OneToMany(() => Variant, (v) => v.product)
  variants: Variant[];
}

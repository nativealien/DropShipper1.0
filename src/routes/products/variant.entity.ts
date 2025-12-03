// src/variants/variant.entity.ts
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Product } from '../products/product.entity';
  
  @Entity('variants')
  export class Variant {
    @PrimaryGeneratedColumn()
    id: number;
  
    // --- RELATIONS ---
    @ManyToOne(() => Product, (product) => product.variants, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;
  
    // --- PROVIDER INFO ---
    @Column({ nullable: true })
    vid?: string; // provider's variant ID
  
    @Column({ nullable: true })
    sku?: string;
  
    @Column({ nullable: true })
    name?: string;
  
    @Column({ nullable: true })
    key?: string; // e.g. color+size identifier
  
    @Column({ nullable: true })
    standard?: string;
  
    // --- PHYSICAL DIMENSIONS ---
    @Column({ type: 'numeric', nullable: true })
    length?: number;
  
    @Column({ type: 'numeric', nullable: true })
    width?: number;
  
    @Column({ type: 'numeric', nullable: true })
    height?: number;
  
    @Column({ type: 'numeric', nullable: true })
    weight?: number;
  
    // --- IMAGES ---
    @Column({ nullable: true })
    image_url?: string;
  
    // --- PRICING ---
    @Column({ type: 'numeric', nullable: true })
    buy_price?: number;
  
    @Column({ type: 'numeric', nullable: true })
    suggested_price?: number;
  
    @Column({ type: 'numeric', nullable: true })
    margin_percent?: number;
  
    @Column({ type: 'numeric', nullable: true })
    sell_price?: number;
  
    // --- META ---
    @Column({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;
  }
  
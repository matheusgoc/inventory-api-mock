import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({name: 'inventories'})
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  color: string

  @Column()
  size: string

  @ManyToOne(() => Product, product => product.inventories)
  @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
  product: Product
}
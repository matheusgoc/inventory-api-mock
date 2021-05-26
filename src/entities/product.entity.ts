import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn
} from "typeorm";
import { Company } from "./comapny.entity";
import { Inventory } from "./inventory.entity";

@Entity({name: 'products'})
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne(() => Company, company => company.products)
  @JoinColumn({name: 'company_id', referencedColumnName: 'id'})
  company: Company

  @OneToMany(() => Inventory, inventory => inventory.product)
  inventories: Inventory
}
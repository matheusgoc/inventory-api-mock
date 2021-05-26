import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity({name: 'companies'})
export class Company {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => User, user => user.companies)
  users: User[]

  @OneToMany(() => Product, product => product.company)
  products: Product[]
}
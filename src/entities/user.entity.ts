import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Company } from "./comapny.entity";

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @ManyToMany(() => Company, company => company.users)
  @JoinTable({
    name: 'user_company',
    joinColumn: { name: 'users', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'companies', referencedColumnName: 'id' }
  })
  companies: Company[]
}
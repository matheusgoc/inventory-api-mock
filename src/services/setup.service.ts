import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Company } from "../entities/comapny.entity";
import { Product } from "../entities/product.entity";
import * as colors from "colors";
import * as faker from "faker";
import * as bcrypt from "bcrypt";

@Injectable()
export class SetupService implements OnModuleInit {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async onModuleInit() {

    const user = await this.userRepo.findOne()
    if (!user) {
      await this.seed()
      console.log(colors.america("The database has been seeded!"))
    }
  }

  async seed(): Promise<void> {

    const user1 = await this.createUser(
      'Matheus Camara',
      'matheus.goc@gmail.com',
      await bcrypt.hash('secret', 10))

    const user2 = await this.createUser(
      'Super Man',
      'superman@gmail.com',
      await bcrypt.hash('secret', 10))

    const company1 = await this.createCompany(
      faker.company.companyName(),
      [user1])

    for(let i = 0; i < 10; i++) {
      await this.createProduct(
        faker.commerce.productName(),
        faker.commerce.productDescription(),
        company1)
    }

    const company2 = await this.createCompany(
      faker.company.companyName(),
      [user1, user2])

    for(let i = 0; i < 10; i++) {
      await this.createProduct(
        faker.commerce.productName(),
        faker.commerce.productDescription(),
        company2)
    }

    return
  }

  private createUser(name, email, password): Promise<User> {
    const user = new User()
    user.name = name
    user.email = email
    user.password = password
    return this.userRepo.save(user)
  }

  private createCompany(name, users: User[]): Promise<Company> {
    const company = new Company()
    company.name = name
    company.users = users
    return this.companyRepo.save(company)
  }

  private createProduct(name, description, company: Company): Promise<Product> {
    const product = new Product()
    product.name = name
    product.description = description
    product.company = company
    return this.productRepo.save(product)
  }
}
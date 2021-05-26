import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Company } from "../entities/comapny.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(Company)
    private repo: Repository<Company>
  ) {}

  findAll(): Promise<Company[]> {
    return this.repo.find()
  }

  findOne(id: number): Promise<Company> {
    return this.repo.findOne(id)
  }

  save(company: Company, users?: User[]): Promise<Company> {
    if (users) {
      company.users = users
    }
    return this.repo.save(company)
  }
}

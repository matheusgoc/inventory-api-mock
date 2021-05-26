import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { DeleteResult, Repository } from "typeorm";
import { Company } from "../entities/comapny.entity";

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>
  ) {}

  findAll(): Promise<Product[]> {
    return this.repo.find({relations: ['company']})
  }

  findAllByCompanyId(companyId: number): Promise<Product[]> {
    return this.repo.find({where: {company: companyId}})
  }

  findOne(id: number): Promise<Product> {
    return this.repo.findOne(id)
  }

  create(product: Product): Promise<Product> {
    return this.repo.save(product)
  }

  async update(product: Product): Promise<Product> {
    await this.repo.update(product, { id: product.id })
    return product
  }

  remove(id: number): Promise<DeleteResult> {
    return this.repo.delete(id)
  }
}

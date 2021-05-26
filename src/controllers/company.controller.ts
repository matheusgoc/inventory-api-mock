import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request } from "@nestjs/common";
import { Company } from "../entities/comapny.entity";
import { CompanyService } from "../services/company.service";
import { Product } from "../entities/product.entity";
import { ProductService } from "../services/product.service";

@Controller('company')
export class CompanyController {

  constructor(
    private companyService: CompanyService,
    private productService: ProductService,
  ) {}

  @Post()
  async create(@Body() company: Company, @Request() req): Promise<Company> {
    company.id = null
    company = await this.companyService.save(company, [req.user])
    delete company.users
    return company
  }

  @Get()
  findAll(): Promise<Company[]> {
    return this.companyService.findAll()
  }

  @Get(':id/products')
  findProducts(@Param('id') companyId: number): Promise<Product[]> {
    return this.productService.findAllByCompanyId(companyId)
  }

  @Post(':id/product')
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Param('id') companyId: number, @Body() product: Product): Promise<Product> {
    product.company = await this.companyService.findOne(companyId)
    product = await this.productService.create(product)
    delete product.company
    return product
  }
}

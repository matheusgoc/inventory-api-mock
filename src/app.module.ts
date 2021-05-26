import { Module } from "@nestjs/common";
import { AppController } from "./controllers/app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyController } from "./controllers/company.controller";
import { ProductController } from "./controllers/product.controller";
import { ProductService } from "./services/product.service";
import { CompanyService } from "./services/company.service";
import { User } from "./entities/user.entity";
import { Company } from "./entities/comapny.entity";
import { Product } from "./entities/product.entity";
import { Inventory } from "./entities/inventory.entity";
import { getConnectionOptions } from "typeorm";
import { SetupService } from "./services/setup.service";
import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    TypeOrmModule.forFeature([
      User,
      Company,
      Product,
      Inventory,
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expirationTime },
    }),
  ],
  exports: [UserService, AuthService, JwtModule],
  providers: [
    UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ProductService,
    CompanyService,
    SetupService,
  ],
  controllers: [
    AppController,
    CompanyController,
    ProductController,
  ],
})
export class AppModule {}

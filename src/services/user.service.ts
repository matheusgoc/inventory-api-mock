import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ) {}

  findOne(id: number): Promise<User> {
    return this.repo.findOne(id)
  }

  findByEmail(email: string): Promise<User> {
    return this.repo.findOne({where:{email}})
  }

  save(user: User): Promise<User> {
    return this.repo.save(user)
  }
}
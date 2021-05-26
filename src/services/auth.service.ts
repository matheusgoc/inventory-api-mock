import { Injectable } from '@nestjs/common';
import { UserService } from "./user.service";
import { User } from "../entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<Omit<User,'password'>> {

    const user = await this.userService.findByEmail(email)
    if (user.password && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result
    }

    return null
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}

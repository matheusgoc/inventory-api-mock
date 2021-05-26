import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { AuthService } from "../services/auth.service";
import { Public } from "../decorators/public.decorator";

@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async auth(@Request() req) {

    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    const user = req.user
    delete user.password
    return user
  }
}
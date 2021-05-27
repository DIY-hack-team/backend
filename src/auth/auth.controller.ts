import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LoginResponseDTO } from './dto/login-response.dto';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): LoginResponseDTO {
    return req.user;
  }
}

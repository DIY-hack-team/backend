import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDTO } from './dto/login-response.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validate(username: string, password: string): LoginResponseDTO {
    const user = this.authService.validateUser(username, password);
    if (user) {
      return this.authService.login(user);
    } else {
      throw new UnauthorizedException();
    }
  }
}

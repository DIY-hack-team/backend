import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { env } from '../env';
import { LoginResponseDTO } from './dto/login-response.dto';
import { AuthUser } from './entities/auth_user.entity';
import { RoleEnum } from './enums/role.enum';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(userName: string, userPassword: string): AuthUser {
    if (userName == env.ADMIN_NAME && userPassword === env.ADMIN_PASSWORD) {
      return {
        id: 0,
        group: 0,
        name: userName,
        role: RoleEnum.Admin,
      };
    }
    return null;
  }

  login(user: any): LoginResponseDTO {
    return {
      token: this.jwtService.sign({ sub: user.id }),
      user: user,
    };
  }
}

import { AuthUser } from '../entities/auth_user.entity';

export class LoginResponseDTO {
  token: string;
  user: AuthUser;
}

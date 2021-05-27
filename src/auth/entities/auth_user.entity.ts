import { RoleEnum } from '../enums/role.enum';

export class AuthUser {
  id: number;
  group: number;
  name: string;
  role: RoleEnum;
}

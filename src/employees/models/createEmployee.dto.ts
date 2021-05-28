import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  legalEntity: string;

  @ApiProperty()
  organisation: string;

  @ApiProperty()
  businessRole: string;

  @ApiProperty()
  costCenter: string;

  @ApiProperty()
  ldap: number;
}

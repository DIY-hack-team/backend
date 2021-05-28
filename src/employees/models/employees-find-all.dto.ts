import { ApiPropertyOptional } from '@nestjs/swagger';

export class EmployeeFindAllDto {
  @ApiPropertyOptional()
  search: string;

  @ApiPropertyOptional()
  domain: string;
}

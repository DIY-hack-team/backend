import { ApiPropertyOptional } from '@nestjs/swagger';

export class DomainsFindAllDto {
  @ApiPropertyOptional()
  search: string;
}

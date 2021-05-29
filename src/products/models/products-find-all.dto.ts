import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductsFindAllDto {
  @ApiPropertyOptional()
  search: string;

  @ApiPropertyOptional()
  domain: string;
}

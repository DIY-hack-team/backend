import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProjectFindAllDto {
  @ApiPropertyOptional()
  search: string;

  @ApiPropertyOptional()
  domain: string;
}

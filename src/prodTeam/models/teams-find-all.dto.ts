import { ApiPropertyOptional } from '@nestjs/swagger';

export class TeamsFindAllDto {
  @ApiPropertyOptional()
  search: string;

  @ApiPropertyOptional()
  domain: string;
}

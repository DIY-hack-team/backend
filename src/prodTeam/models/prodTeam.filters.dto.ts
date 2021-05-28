import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterDto } from '../../shared/dtos/filter.dto';

export class ProductTeamFilterFieldsDto {
  @ApiPropertyOptional()
  product_team_rus: string;

  @ApiPropertyOptional()
  cost_center: string;

  @ApiPropertyOptional()
  domain_id: string;

  @ApiPropertyOptional()
  status: string;

  @ApiPropertyOptional()
  product_team_type: string;
}

export class ProductTeamFilterDto extends FilterDto {
  @ApiProperty()
  filters: ProductTeamFilterFieldsDto;
}

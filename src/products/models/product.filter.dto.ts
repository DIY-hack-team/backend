import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterDto } from '../../shared/dtos/filter.dto';

export class ProductFilterFieldsDto {
  @ApiPropertyOptional()
  product_team_id: string;

  @ApiPropertyOptional()
  status: string;
}

export class ProductFilterDto extends FilterDto {
  @ApiProperty()
  filters: ProductFilterFieldsDto;
}

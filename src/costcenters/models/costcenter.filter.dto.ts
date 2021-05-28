import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterDto } from '../../shared/dtos/filter.dto';

export class CostcenterFilterFieldsDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  code: string;

  @ApiPropertyOptional()
  domain: string;
}

export class CostcenterFilterDto extends FilterDto {
  @ApiProperty()
  filters: CostcenterFilterFieldsDto;
}

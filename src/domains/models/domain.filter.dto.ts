import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterDto } from '../../shared/dtos/filter.dto';

export class DomainFilterFieldsDto {
  @ApiPropertyOptional()
  domain_name_rus: string;

  @ApiPropertyOptional()
  domain_tag: string;

  @ApiPropertyOptional()
  domain_id: string;
}

export class DomainFilterDto extends FilterDto {
  @ApiProperty()
  filters: DomainFilterFieldsDto;
}

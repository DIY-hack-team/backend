import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterDto } from '../../shared/dtos/filter.dto';

export class ProjectFilterFieldsDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  status: string;

  @ApiPropertyOptional()
  it_system: string;

  @ApiPropertyOptional()
  employee: string;
}

export class ProjectFilterDto extends FilterDto {
  @ApiProperty()
  filters: ProjectFilterFieldsDto;
}

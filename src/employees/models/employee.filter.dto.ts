import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterDto } from '../../shared/dtos/filter.dto';

export class EmployeeFilterFieldsDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  organisation: string;

  @ApiPropertyOptional()
  ldap: string;

  @ApiPropertyOptional()
  cost_center: string;

  @ApiPropertyOptional()
  product_team_type: string;

  @ApiPropertyOptional()
  business_role: string;
}

export class EmployeeFilterDto extends FilterDto {
  @ApiProperty()
  filters: EmployeeFilterFieldsDto;
}

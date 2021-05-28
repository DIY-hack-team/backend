import { ApiProperty } from '@nestjs/swagger';

export class CreateCostcenterDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  domain: string;
}

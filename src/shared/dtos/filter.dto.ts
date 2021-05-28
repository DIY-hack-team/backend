import { ApiProperty } from '@nestjs/swagger';

export class FilterDto {
  @ApiProperty({ type: Number })
  offset = 0;

  @ApiProperty({ type: Number })
  limit = 50;
}

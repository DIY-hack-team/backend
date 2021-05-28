import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  itSystem: string;

  @ApiProperty()
  employee: string;

  @ApiProperty()
  status: string;
}

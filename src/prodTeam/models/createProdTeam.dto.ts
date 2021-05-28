import { ApiProperty } from '@nestjs/swagger';

export class CreateProdTeamDto {
  @ApiProperty()
  prodTeamId: string;

  @ApiProperty()
  prodTeamName: string;

  @ApiProperty()
  prodTeamRus: string;

  @ApiProperty()
  prodTeamType: string;

  @ApiProperty()
  costCenter: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  domainId: string;
}

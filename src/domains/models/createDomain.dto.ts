import { ApiProperty } from '@nestjs/swagger';

export class CreateDomainDto {
  @ApiProperty()
  domainId: string;

  @ApiProperty()
  domainTag: string;

  @ApiProperty()
  domainName: string;

  @ApiProperty()
  domainNameRus: string;

  @ApiProperty()
  status: string;
}

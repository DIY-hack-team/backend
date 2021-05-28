import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainsService } from './domains.service';
import { DomainsController } from './domains.controller';
import { Domain } from './models/domain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Domain])],
  controllers: [DomainsController],
  providers: [DomainsService],
})
export class DomainsModule {}

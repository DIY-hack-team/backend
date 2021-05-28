import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdTeamsService } from './prodTeams.service';
import { ProdTeamsController } from './prodTeams.controller';
import { ProdTeam } from './models/prodTeam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdTeam])],
  controllers: [ProdTeamsController],
  providers: [ProdTeamsService],
})
export class ProdTeamModule {}

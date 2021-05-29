import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateProdTeamDto } from './models/createProdTeam.dto';

import { ProdTeam } from './models/prodTeam.entity';
import { TeamsFindAllDto } from './models/teams-find-all.dto';

@Injectable()
export class ProdTeamsService {
  constructor(
    private connection: Connection,
    @InjectRepository(ProdTeam)
    private prodTeamsRepo: Repository<ProdTeam>,
  ) {}

  async create(
    createProdTeamDto: CreateProdTeamDto,
  ): Promise<{ prodTeam: ProdTeam }> {
    const prodTeam = this.prodTeamsRepo.create({
      product_team_id: createProdTeamDto.prodTeamId,
      product_team_name: createProdTeamDto.prodTeamName,
      product_team_rus: createProdTeamDto.prodTeamRus,
      product_team_type: createProdTeamDto.prodTeamType,
      cost_center: createProdTeamDto.costCenter,
      status: createProdTeamDto.status,
    });
    const result: ProdTeam = await this.prodTeamsRepo.save(prodTeam);
    return { prodTeam: result };
  }

  async findAll(params: TeamsFindAllDto): Promise<ProdTeam[]> {
    const whereStack = [];
    if (params.search) {
      whereStack.push({
        stmt:
          'product_team_id = :eqSearch or product_team_rus ilike :likeSearch',
        params: {
          eqSearch: params.search,
          likeSearch: `%${params.search}%`,
        },
      });
    }

    if (params.domain) {
      // TODO: search domain
    }

    const queryBuilder = this.prodTeamsRepo.createQueryBuilder();
    if (whereStack.length > 0) {
      queryBuilder.where(whereStack[0].stmt, whereStack[0].params);
    }

    if (whereStack.length > 1) {
      whereStack.slice(1).forEach((item) => {
        queryBuilder.andWhere(item.stmt, item.params);
      });
    }

    return queryBuilder.getMany();
  }

  async findOne(prodTeamId: string): Promise<ProdTeam> {
    const prodTeam = await this.prodTeamsRepo.findOne(prodTeamId);
    if (prodTeam) {
      return prodTeam;
    } else {
      throw new NotFoundException(
        `Entity ProdTeam with prodTeamId = ${prodTeamId} not found`,
      );
    }
  }
}

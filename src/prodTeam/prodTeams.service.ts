import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateProdTeamDto } from './models/createProdTeam.dto';

import { ProdTeam } from './models/prodTeam.entity';
import { ProductTeamFilterFieldsDto } from './models/prodTeam.filters.dto';

@Injectable()
export class ProdTeamsService {
  getByFilter(
    limit: number,
    offset: number,
    filters: ProductTeamFilterFieldsDto,
  ): Promise<ProdTeam[]> {
    // do search by filter
    return;
  }
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

  async findAll(): Promise<ProdTeam[]> {
    return await this.prodTeamsRepo.find();
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

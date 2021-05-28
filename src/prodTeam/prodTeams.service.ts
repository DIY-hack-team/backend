import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateProdTeamDto } from './models/createProdTeam.dto';

import { ProdTeam } from './models/prodTeam.entity';

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
      prodTeamId: createProdTeamDto.prodTeamId,
      prodTeamName: createProdTeamDto.prodTeamName,
      prodTeamRus: createProdTeamDto.prodTeamRus,
      prodTeamType: createProdTeamDto.prodTeamType,
      costCenter: createProdTeamDto.costCenter,
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

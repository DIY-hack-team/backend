import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateCostcenterDto } from './models/createCostcenter.dto';

import { Costcenter } from './models/costcenter.entity';
import { CostcenterFilterFieldsDto } from './models/costcenter.filter.dto';

@Injectable()
export class CostcentersService {
  getByFilter(
    limit: number,
    offset: number,
    filters: CostcenterFilterFieldsDto,
  ): Promise<Costcenter[]> {
    // DO search by filter there
    return;
  }
  constructor(
    private connection: Connection,
    @InjectRepository(Costcenter)
    private costcentersRepo: Repository<Costcenter>,
  ) {}

  async create(
    createCostcenterDto: CreateCostcenterDto,
  ): Promise<{ costcenter: Costcenter }> {
    const costcenter = this.costcentersRepo.create({
      code: createCostcenterDto.code,
      name: createCostcenterDto.name,
      domain: createCostcenterDto.domain,
    });
    const result: Costcenter = await this.costcentersRepo.save(costcenter);
    return { costcenter: result };
  }

  async findAll(): Promise<Costcenter[]> {
    return await this.costcentersRepo.find();
  }

  async findOne(code: string): Promise<Costcenter> {
    const costcenter = await this.costcentersRepo.findOne(code);
    if (costcenter) {
      return costcenter;
    } else {
      throw new NotFoundException(
        `Entity Costcenter with code = ${code} not found`,
      );
    }
  }
}

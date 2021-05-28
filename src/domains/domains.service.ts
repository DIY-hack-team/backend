import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateDomainDto } from './models/createDomain.dto';

import { Domain } from './models/domain.entity';
import { DomainsFindAllDto } from './models/domains-find-all.dto';

@Injectable()
export class DomainsService {
  constructor(
    private connection: Connection,
    @InjectRepository(Domain)
    private domainsRepo: Repository<Domain>,
  ) {}

  async create(createDomainDto: CreateDomainDto): Promise<{ domain: Domain }> {
    const domain = this.domainsRepo.create({
      domain_id: createDomainDto.domainId,
      domain_tag: createDomainDto.domainTag,
      domain_name: createDomainDto.domainName,
      domain_name_rus: createDomainDto.domainNameRus,
      status: createDomainDto.status,
    });
    const result: Domain = await this.domainsRepo.save(domain);
    return { domain: result };
  }

  async findAll(params: DomainsFindAllDto): Promise<Domain[]> {
    const queryBuilder = this.domainsRepo.createQueryBuilder();
    if (params.search) {
      queryBuilder.where('domain_name_rus ilike :name', {
        name: `%${params.search}%`,
      });
    }
    return await queryBuilder.getMany();
  }

  async findOne(domainId: string): Promise<Domain> {
    const domain = await this.domainsRepo.findOne(domainId);
    if (domain) {
      return domain;
    } else {
      throw new NotFoundException(
        `Entity Domain with prodTeamId = ${domainId} not found`,
      );
    }
  }
}

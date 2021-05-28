import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateDomainDto } from './models/createDomain.dto';

import { Domain } from './models/domain.entity';
import { DomainFilterFieldsDto } from './models/domain.filter.dto';

@Injectable()
export class DomainsService {
  getByFilter(
    limit: number,
    offset: number,
    filters: DomainFilterFieldsDto,
  ): Promise<Domain[]> {
    // do search by filter there
    return;
  }
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

  async findAll(): Promise<Domain[]> {
    return await this.domainsRepo.find();
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

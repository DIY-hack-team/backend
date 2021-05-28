import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateDomainDto } from './models/createDomain.dto';

import { Domain } from './models/domain.entity';

@Injectable()
export class DomainsService {
  constructor(
    private connection: Connection,
    @InjectRepository(Domain)
    private domainsRepo: Repository<Domain>,
  ) {}

  async create(createDomainDto: CreateDomainDto): Promise<{ domain: Domain }> {
    const domain = this.domainsRepo.create({
      domainId: createDomainDto.domainId,
      domainTag: createDomainDto.domainTag,
      domainName: createDomainDto.domainName,
      domainNameRus: createDomainDto.domainNameRus,
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

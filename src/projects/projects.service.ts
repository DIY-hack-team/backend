import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateProjectDto } from './models/create.project.dto';
import { ProjectFindAllDto } from './models/project-find-all.dto';
import { Project } from './models/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    private connection: Connection,
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
  ): Promise<{ project: Project }> {
    const project = this.projectRepo.create({
      id: createProjectDto.id,
      name: createProjectDto.name,
      it_system: createProjectDto.itSystem,
      employee: createProjectDto.employee,
      status: createProjectDto.status,
    });
    const result: Project = await this.projectRepo.save(project);
    return { project: result };
  }

  async findAll(params: ProjectFindAllDto): Promise<Project[]> {
    const whereStack = [];
    if (params.search) {
      whereStack.push({
        stmt: 'id = :eqSearch or name ilike :likeSearch',
        params: {
          eqSearch: params.search,
          likeSearch: `%${params.search}%`,
        },
      });
    }

    if (params.domain) {
      // TODO: search domain
    }

    const queryBuilder = this.projectRepo.createQueryBuilder();
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

  async findOne(id: string): Promise<Project> {
    const costcenter = await this.projectRepo.findOne(id);
    if (costcenter) {
      return costcenter;
    } else {
      throw new NotFoundException(`Entity Project with id = ${id} not found`);
    }
  }
}

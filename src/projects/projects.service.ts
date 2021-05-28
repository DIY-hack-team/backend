import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateProjectDto } from './models/create.project.dto';

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
      itSystem: createProjectDto.itSystem,
      employee: createProjectDto.employee,
      status: createProjectDto.status,
    });
    const result: Project = await this.projectRepo.save(project);
    return { project: result };
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepo.find();
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

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './models/create.project.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly ProjectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get projects list' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Empty list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Projects list returned',
  })
  async findAll(@Res({ passthrough: true }) res: Response) {
    const projects = await this.ProjectsService.findAll();
    if (projects.length == 0) {
      res.status(HttpStatus.NO_CONTENT);
    }
    return projects;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get project by id' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Project not found',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Project returned' })
  findOne(@Param('id') id: string) {
    return this.ProjectsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new project' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Project created',
  })
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.ProjectsService.create(createProjectDto);
  }
}

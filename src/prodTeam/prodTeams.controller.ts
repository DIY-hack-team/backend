import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ProdTeamsService } from './prodTeams.service';
import { CreateProdTeamDto } from './models/createProdTeam.dto';
import { TeamsFindAllDto } from './models/teams-find-all.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@ApiTags('teams')
@Controller('teams')
export class ProdTeamsController {
  constructor(private readonly ProdTeamsService: ProdTeamsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get product teams list' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Empty list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product teams list returned',
  })
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() params: TeamsFindAllDto,
  ) {
    const prodTeams = await this.ProdTeamsService.findAll(params);
    if (prodTeams.length == 0) {
      res.status(HttpStatus.NO_CONTENT);
    }
    return prodTeams;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get product team by id' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product team not found',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Product team returned' })
  findOne(@Param('id') id: string) {
    return this.ProdTeamsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new product team' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product team created',
  })
  async create(@Body() createProdTeamDto: CreateProdTeamDto) {
    return await this.ProdTeamsService.create(createProdTeamDto);
  }
}

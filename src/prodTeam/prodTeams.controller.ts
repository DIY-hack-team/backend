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
import { ProdTeamsService } from './prodTeams.service';
import { CreateProdTeamDto } from './models/createProdTeam.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { ProductTeamFilterDto } from './models/prodTeam.filters.dto';

@ApiTags('prodteams')
@Controller('prodteams')
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
  async findAll(@Res({ passthrough: true }) res: Response) {
    const prodTeams = await this.ProdTeamsService.findAll();
    if (prodTeams.length == 0) {
      res.status(HttpStatus.NO_CONTENT);
    }
    return prodTeams;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':prodTeamId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get product team by prodTeamId' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product team not found',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Product team returned' })
  findOne(@Param('prodTeamId') prodTeamId: string) {
    return this.ProdTeamsService.findOne(prodTeamId);
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

  @UseGuards(JwtAuthGuard)
  @Get(':filter')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get products by filter' })
  async getByFilter(@Body() body: ProductTeamFilterDto) {
    const { limit, offset, filters } = body;
    return this.ProdTeamsService.getByFilter(limit, offset, filters);
  }
}

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
import { CostcentersService } from './costcenters.service';
import { CreateCostcenterDto } from './models/createCostcenter.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@ApiTags('costcenters')
@Controller('costcenters')
export class CostcentersController {
  constructor(private readonly CostcentersService: CostcentersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get costcenters list' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Empty list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Costcenters list returned',
  })
  async findAll(@Res({ passthrough: true }) res: Response) {
    const costcenters = await this.CostcentersService.findAll();
    if (costcenters.length == 0) {
      res.status(HttpStatus.NO_CONTENT);
    }
    return costcenters;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':code')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get costcenter by code' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Costcenter not found',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Costcenter returned' })
  findOne(@Param('code') code: string) {
    return this.CostcentersService.findOne(code);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new costcenter' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Costcenter created',
  })
  async create(@Body() createCostcenterDto: CreateCostcenterDto) {
    return await this.CostcentersService.create(createCostcenterDto);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
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
import { DomainsService } from './domains.service';
import { CreateDomainDto } from './models/createDomain.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { DomainsFindAllDto } from './models/domains-find-all.dto';

@ApiTags('domains')
@Controller('domains')
export class DomainsController {
  constructor(private readonly DomainsService: DomainsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get domains list' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Empty list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Domains list returned',
  })
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() params: DomainsFindAllDto,
  ) {
    const domains = await this.DomainsService.findAll(params);
    if (domains.length == 0) {
      res.status(HttpStatus.NO_CONTENT);
    }
    return domains;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':domainId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get domain by domainId' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Domain not found',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Domain returned' })
  findOne(@Param('domainId') domainId: string) {
    return this.DomainsService.findOne(domainId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new domain' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Domain created',
  })
  async create(@Body() createDomainDto: CreateDomainDto) {
    return await this.DomainsService.create(createDomainDto);
  }
}

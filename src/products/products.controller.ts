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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './models/createProduct.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get products list' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Empty list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Products list returned',
  })
  async findAll(@Res({ passthrough: true }) res: Response) {
    const products = await this.ProductsService.findAll();
    if (products.length == 0) {
      res.status(HttpStatus.NO_CONTENT);
    }
    return products;
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
    return this.ProductsService.findOne(domainId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product created',
  })
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.ProductsService.create(createProductDto);
  }
}

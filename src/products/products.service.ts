import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateProductDto } from './models/createProduct.dto';

import { Product } from './models/product.entity';
import { ProductFilterFieldsDto } from './models/product.filter.dto';

@Injectable()
export class ProductsService {
  getByFilter(
    limit: number,
    offset: number,
    filters: ProductFilterFieldsDto,
  ): Promise<Product[]> {
    //do search by filters
    return;
  }
  constructor(
    private connection: Connection,
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<{ product: Product }> {
    const product = this.productsRepo.create({
      product_id: createProductDto.productId,
      product_name: createProductDto.productName,
      product_team_id: createProductDto.productTeamId,
      status: createProductDto.status,
    });
    const result: Product = await this.productsRepo.save(product);
    return { product: result };
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepo.find();
  }

  async findOne(product_id: string): Promise<Product> {
    const product = await this.productsRepo.findOne(product_id);
    if (product) {
      return product;
    } else {
      throw new NotFoundException(
        `Entity Product with product_id = ${product_id} not found`,
      );
    }
  }
}

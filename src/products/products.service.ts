import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateProductDto } from './models/createProduct.dto';

import { Product } from './models/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private connection: Connection,
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<{ product: Product }> {
    const product = this.productsRepo.create({
      productId: createProductDto.productId,
      productName: createProductDto.productName,
      productTeamId: createProductDto.productTeamId,
      status: createProductDto.status,
    });
    const result: Product = await this.productsRepo.save(product);
    return { product: result };
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepo.find();
  }

  async findOne(productId: string): Promise<Product> {
    const product = await this.productsRepo.findOne(productId);
    if (product) {
      return product;
    } else {
      throw new NotFoundException(
        `Entity Product with productId = ${productId} not found`,
      );
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateProductDto } from './models/createProduct.dto';

import { Product } from './models/product.entity';
import { ProductsFindAllDto } from './models/products-find-all.dto';

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
      product_id: createProductDto.productId,
      product_name: createProductDto.productName,
      product_team_id: createProductDto.productTeamId,
      status: createProductDto.status,
    });
    const result: Product = await this.productsRepo.save(product);
    return { product: result };
  }

  async findAll(params: ProductsFindAllDto): Promise<Product[]> {
    const whereStack = [];
    if (params.search) {
      whereStack.push({
        stmt: 'product_id = :eqSearch or product_name ilike :likeSearch',
        params: {
          eqSearch: params.search,
          likeSearch: `%${params.search}%`,
        },
      });
    }

    if (params.domain) {
      // TODO: search domain
    }

    const queryBuilder = this.productsRepo.createQueryBuilder();
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

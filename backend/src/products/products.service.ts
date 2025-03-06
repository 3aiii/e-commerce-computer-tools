import { Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    return this.DatabaseService.product.create({ data: createProductDto });
  }

  async findAll(page: number, perPage: number, search: String) {
    return this.DatabaseService.product.findMany({});
  }

  async findOne(id: number) {
    return this.DatabaseService.product.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.DatabaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.DatabaseService.product.delete({
      where: { id },
    });
  }
}

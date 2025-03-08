import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from './../database/database.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.DatabaseService.category.create({ data: createCategoryDto });
  }

  findAll() {
    return this.DatabaseService.category.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: Prisma.CategoryUpdateInput) {
    return this.DatabaseService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

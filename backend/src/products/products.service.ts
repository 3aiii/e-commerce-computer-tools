import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { Prisma } from '@prisma/client';
import slugify from 'slugify';

@Injectable()
export class ProductsService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    const slug = slugify(createProductDto.name, { lower: true, strict: true });

    return this.DatabaseService.product.create({
      data: { ...createProductDto, slug },
    });
  }

  async image(filename: string, productId: number) {
    return this.DatabaseService.productImage.create({
      data: { url: filename, productId: Number(productId) },
    });
  }

  async findAll(
    limit: number,
    page: number = 1,
    perPage: number,
    search?: string,
  ) {
    const skip = (page - 1) * perPage;

    const whereCondition: Prisma.ProductWhereInput = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const data = await this.DatabaseService.product.findMany({
      where: whereCondition,
      include: {
        category: true,
      },
      skip,
      take: Number(perPage),
    });

    const total = await this.DatabaseService.product.count({
      where: whereCondition,
    });

    if (data.length === 0) {
      throw new HttpException(
        'No products available to display',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      data,
      pagination: {
        totalPages: Math.ceil(total / perPage),
        currentPage: Number(page),
        perPage: Number(perPage),
      },
    };
  }

  async findOne(id: number) {
    return this.DatabaseService.product.findUnique({
      where: { id },
      include: {
        category: true,
        ProductImage: true,
      },
    });
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.DatabaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    const data = await this.DatabaseService.product.findFirst({
      where: { id },
    });

    const updatedStatus = !data?.status;

    return this.DatabaseService.product.update({
      where: { id: Number(id) },
      data: {
        status: updatedStatus,
      },
    });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    status?: string,
  ) {
    const skip = (page - 1) * perPage;

    const whereCondition: Prisma.ProductWhereInput = {
      AND: [
        search
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
          : {},

        status
          ? {
              status: {
                equals: status === 'active',
              },
            }
          : {},
      ],
    };

    const data = await this.DatabaseService.product.findMany({
      where: whereCondition,
      include: {
        category: true,
        ProductImage: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(perPage),
    });

    const ratings = await this.DatabaseService.reviewProduct.groupBy({
      by: ['productId'],
      _avg: {
        totalRating: true,
      },
      _count: {
        productId: true,
      },
      where: {
        productId: {
          in: data.map((product) => product.id),
        },
        condition: 'Reviewed',
      },
    });

    const productsWithAvgRating = data.map((product) => {
      const rating = ratings.find((r) => r.productId === product.id);
      return {
        ...product,
        avgRating: rating?._avg.totalRating ?? null,
        countUserRating: rating?._count.productId ?? null,
      };
    });

    const total = await this.DatabaseService.product.count({
      where: whereCondition,
    });

    if (data.length === 0) {
      return {
        data,
      };
    }

    return {
      data: productsWithAvgRating,
      pagination: {
        totalPages: Math.ceil(total / perPage),
        currentPage: Number(page),
        perPage: Number(perPage),
      },
    };
  }

  async findOne(id: number) {
    
    const data = await this.DatabaseService.product.findUnique({
      where: { id },
      include: {
        category: true,
        ProductImage: true,
        ReviewProduct: true,
      },
    });

    const ratings = await this.DatabaseService.reviewProduct.groupBy({
      by: ['productId'],
      _avg: {
        totalRating: true,
      },
      _count: {
        productId: true,
      },
      where: {
        productId: id,
        condition: 'Reviewed',
      },
    });
    const productsWithAvgRating = {
      ...data,
      avgRating: ratings?.[0]?._avg.totalRating ?? null,
      countUserRating: ratings?.[0]?._count.productId ?? null,
    };

    return {
      data,
      ratings,
    };
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    const name =
      typeof updateProductDto.name === 'string' ? updateProductDto.name : '';
    const slug = slugify(name, { lower: true, strict: true });

    return this.DatabaseService.product.update({
      where: { id },
      data: { ...updateProductDto, slug },
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

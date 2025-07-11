import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from './../database/database.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async create(createCategoryDto: Prisma.CategoryCreateInput) {
    if (
      createCategoryDto?.name === '' ||
      createCategoryDto?.name === undefined
    ) {
      throw new HttpException(
        'Please, type category name.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.DatabaseService.category.create({ data: createCategoryDto });
  }

  async findAll(page: number, perPage: number, search: string, status: string) {
    const skip = (page - 1) * perPage;

    const whereCondition: Prisma.CategoryWhereInput = {
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

    const data = await this.DatabaseService.category.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: Number(perPage),
    });

    const total = await this.DatabaseService.category.count({
      where: whereCondition,
    });

    if (data.length === 0) {
      return {
        data,
      };
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

  async findOne(id: number, status: string) {
    return this.DatabaseService.category.findFirst({
      where: {
        AND: [
          { id },
          // status
          //   ? {
          //       status: {
          //         equals: status === 'active',
          //       },
          //     }
          //   : {},
        ],
      },
    });
  }

  async findProductByCategory(id: number, productId: number, search: string) {
    const data = await this.DatabaseService.product.findMany({
      where: {
        AND: [
          { categoryId: Number(id) },
          { status: true },
          search ? { name: { contains: search, mode: 'insensitive' } } : {},
        ],
        NOT: [
          productId
            ? {
                id: productId,
              }
            : {},
        ],
      },
      include: {
        category: true,
        ProductImage: true,
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

    if (data.length === 0) {
      throw new HttpException(
        'No product in this category.',
        HttpStatus.NOT_FOUND,
      );
    }

    const countData = await this.DatabaseService.product.count({
      where: {
        AND: [
          { categoryId: Number(id) },
          { status: true },
          search ? { name: { contains: search, mode: 'insensitive' } } : {},
        ],
        NOT: [
          productId
            ? {
                id: productId,
              }
            : {},
        ],
      },
    });

    return { data: productsWithAvgRating, countData };
  }

  async update(id: number, updateCategoryDto: Prisma.CategoryUpdateInput) {
    if (
      updateCategoryDto?.name === '' ||
      updateCategoryDto?.name === undefined
    ) {
      throw new HttpException(
        'Please, type category name.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.DatabaseService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    const data = await this.DatabaseService.category.findFirst({
      where: { id },
    });
    const updatedStatus = !data?.status;

    return this.DatabaseService.category.update({
      where: { id },
      data: { status: updatedStatus },
    });
  }
}

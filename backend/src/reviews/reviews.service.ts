import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { Prisma, condition } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  create(createReviewDto: Prisma.ReviewProductCreateInput) {
    return this.DatabaseService.reviewProduct.create({
      data: createReviewDto,
    });
  }

  async findAll(userId: number, status: string) {
    const orderIds = await this.DatabaseService.reviewProduct.findMany({
      where: {
        AND: [
          { order: { userId } },
          { condition: { equals: status as condition } },
          { status: true },
        ],
      },
      select: {
        id: true,
        status: true,
        condition: true,
        ratingMaterial: true,
        ratingComplementary: true,
        ratingUsed: true,
        ratingFunction: true,
        ratingWorth: true,
        totalRating: true,
        updatedAt: true,
        comment: true,
        order: {
          include: {
            OrderDetails: true,
            user: {
              select: {
                email: true,
                profile: true,
              },
            },
          },
        },
        Product: {
          include: {
            ProductImage: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (orderIds?.length === 0) {
      return [];
    }

    return orderIds;
  }

  findOne(id: number) {
    return this.DatabaseService.reviewProduct.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: number, updateReviewDto: Prisma.ReviewProductUpdateInput) {
    return this.DatabaseService.reviewProduct.update({
      where: {
        id,
      },
      data: updateReviewDto,
    });
  }

  patch(id: number, updateReviewDto: Prisma.ReviewProductUpdateInput) {
    return this.DatabaseService.reviewProduct.update({
      where: {
        id,
      },
      data: {
        comment: updateReviewDto?.comment,
        ratingMaterial: updateReviewDto?.ratingMaterial,
        ratingFunction: updateReviewDto?.ratingFunction,
        ratingComplementary: updateReviewDto?.ratingComplementary,
        ratingUsed: updateReviewDto?.ratingUsed,
        ratingWorth: updateReviewDto?.ratingWorth,
        totalRating: updateReviewDto?.totalRating,
        condition: 'Reviewed',
      },
    });
  }

  async top3() {
    const topOfProductReviews =
      await this.DatabaseService.reviewProduct.groupBy({
        by: ['productId'],
        _avg: {
          totalRating: true,
        },
        where: {
          condition: 'Reviewed',
        },
        orderBy: {
          _avg: {
            totalRating: 'desc',
          },
        },
        take: 3,
      });

    const products = await Promise.all(
      topOfProductReviews.map(async (top) => {
        const product = await this.DatabaseService.product.findFirst({
          where: {
            id: top.productId || 0,
          },
          select: {
            name: true,
            slug: true,
            ProductImage: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        });

        return {
          ...product,
          averageRating: top._avg.totalRating,
        };
      }),
    );

    return products;
  }
}

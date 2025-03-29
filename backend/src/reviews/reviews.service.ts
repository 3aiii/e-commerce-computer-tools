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
        ],
      },
    });

    if (orderIds?.length === 0) {
      return [];
    }

    const orderDetails = await this.DatabaseService.orderDetails.findMany({
      where: {
        AND: [{ orderId: { in: orderIds.map((order) => order.orderId) } }],
      },
      include: {
        product: {
          include: {
            ProductImage: true,
            ReviewProduct: true,
          },
        },
        order: {
          include: {
            user: {
              select: {
                email: true,
                profile: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          order: {
            updatedAt: 'desc',
          },
        },
      ],
    });

    console.log(orderDetails);
    const NewOrderDetails = Object.values(orderDetails).filter(
      (order) =>
        order?.product?.ReviewProduct?.[0]?.condition === status &&
        order?.product?.ReviewProduct?.[0]?.status === true,
    );

    return NewOrderDetails;
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

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}

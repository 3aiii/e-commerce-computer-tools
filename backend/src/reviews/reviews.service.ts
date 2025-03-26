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
    const orderId = await this.DatabaseService.reviewProduct.findMany({
      where: {
        AND: [
          {
            order: {
              userId,
            },
          },
          {
            condition: status as condition,
          },
        ],
      },
      select: {
        orderId: true,
      },
    });

    if (orderId?.length === 0) {
      return [];
    }

    const orderDetails = await this.DatabaseService.orderDetails.findMany({
      where: {
        orderId: orderId?.[0]?.orderId,
      },
      include: {
        product: {
          include: {
            ProductImage: true,
            ReviewProduct: true,
          },
        },
        order: {
          select: {
            invoiceNo: true,
          },
        },
      },
    });

    return orderDetails;
  }

  findOne(id: number) {
    return this.DatabaseService.reviewProduct.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: number, updateReviewDto: Prisma.ReviewProductUpdateInput) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}

import { Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  create(createReviewDto: Prisma.ReviewProductCreateInput) {
    return this.DatabaseService.reviewProduct.create({
      data: createReviewDto,
    });
  }

  findAll(userId: number) {
    return this.DatabaseService.reviewProduct.findMany({
      where: {
        id: userId,
      },
    });
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

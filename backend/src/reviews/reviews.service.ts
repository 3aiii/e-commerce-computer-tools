import { Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  create(createReviewDto: Prisma.ReviewProductCreateInput) {
    return 'This action adds a new review';
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: Prisma.ReviewProductUpdateInput) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}

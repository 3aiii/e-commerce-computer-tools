import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Prisma } from '@prisma/client';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: Prisma.ReviewProductCreateInput) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get('findAll/:id')
  findAll(@Param('id') userId: string, @Query('status') status: string) {
    return this.reviewsService.findAll(+userId, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: Prisma.ReviewProductUpdateInput,
  ) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Patch('patch/:id')
  patch(
    @Param('id') id: string,
    @Body() updateReviewDto: Prisma.ReviewProductUpdateInput,
  ) {
    return this.reviewsService.patch(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}

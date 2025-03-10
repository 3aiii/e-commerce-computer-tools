import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { Prisma } from '@prisma/client';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  create(@Body() createDiscountDto: Prisma.DiscountCreateInput) {
    return this.discountService.create(createDiscountDto);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search: string,
  ) {
    try {
      return this.discountService.findAll(page, perPage, search);
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscountDto: Prisma.DiscountCreateInput,
  ) {
    return this.discountService.update(+id, updateDiscountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountService.remove(+id);
  }
}

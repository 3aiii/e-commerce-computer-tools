import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import multerOption from 'src/config/multer.config';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(
    @Body()
    createOrderDto: Prisma.OrderCreateInput & {
      cartItems: { productId: number; quantity: number; price: number }[];
      userId?: number;
      discountId?: number;
    },
  ) {
    return this.ordersService.create(createOrderDto);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('image', multerOption))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') productId: number,
  ) {
    const { filename } = file;

    try {
      return this.ordersService.image(filename, productId);
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('findAll/:id')
  findAll(
    @Param('id') id: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search: string,
    @Query('status') status: string,
  ) {
    try {
      return this.ordersService.findAll(+id, page, perPage, search, status);
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Query('status') status: string) {
    return this.ordersService.update(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}

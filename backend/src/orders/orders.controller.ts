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

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search: string,
  ) {
    try {
      return this.ordersService.findAll(page, perPage, search);
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
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: Prisma.OrderUpdateInput,
  ) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}

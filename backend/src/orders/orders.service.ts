import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from './../database/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async create(createOrderDto: Prisma.OrderCreateInput) {
    const today = new Date();
    const datePart = today.toISOString().slice(2, 10).replace(/-/g, '');

    const lastOrder = await this.DatabaseService.order.findFirst({
      where: {
        invoiceNo: { startsWith: `ECO-${datePart}-` },
      },
      orderBy: { invoiceNo: 'desc' },
    });

    let newRunNumber = '001';
    if (lastOrder) {
      const lastNumber = parseInt(
        lastOrder.invoiceNo.split('-').pop() || '0',
        10,
      );
      newRunNumber = String(lastNumber + 1).padStart(3, '0');
    }

    const runNumber = `ECO-${datePart}-${newRunNumber}`;
    createOrderDto.invoiceNo = runNumber;

    return this.DatabaseService.order.create({
      data: {
        invoiceNo: createOrderDto.invoiceNo,
        user: { connect: { id: 19 } },
        total: createOrderDto.total,
      },
    });
  }

  async findAll(page: number, perPage: number, search: string) {
    const skip = (page - 1) * perPage;

    const whereCondition: Prisma.OrderWhereInput = search
      ? {
          OR: [
            {
              invoiceNo: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const data = await this.DatabaseService.order.findMany({
      where: whereCondition,
      include: {
        OrderImage: true,
        user: {
          select: { email: true, profile: true },
        },
      },
      skip,
      take: Number(perPage),
    });

    const total = await this.DatabaseService.order.count({
      where: whereCondition,
    });

    if (data.length === 0) {
      throw new HttpException(
        'No orders available to display',
        HttpStatus.NOT_FOUND,
      );
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

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: Prisma.OrderUpdateInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

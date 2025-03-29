import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from './../database/database.service';
import { stat } from 'fs';

@Injectable()
export class OrdersService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async create(
    createOrderDto: Prisma.OrderCreateInput & {
      cartItems: { productId: number; quantity: number; price: number }[];
      userId?: number;
      discountId?: number;
    },
  ) {
    const today = new Date();
    const datePart = today.toISOString().slice(2, 10).replace(/-/g, '');

    const lastOrder = await this.DatabaseService.order.findFirst({
      where: { invoiceNo: { startsWith: `ECO-${datePart}-` } },
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

    return this.DatabaseService.$transaction(async (prisma) => {
      const orderData: any = {
        invoiceNo: runNumber,
        user: { connect: { id: createOrderDto.userId } },
        total: createOrderDto.total,
        OrderDetails: {
          create: createOrderDto.cartItems.map((item) => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            price: item.price,
            subtotal: item.quantity * item.price,
          })),
        },
      };

      if (createOrderDto.discountId) {
        orderData.discount = { connect: { id: createOrderDto.discountId } };
      }

      const order = await prisma.order.create({ data: orderData });
      return order;
    });
  }

  async findAll(
    id: number,
    page: number,
    perPage: number,
    search: string,
    status: string,
  ) {
    const skip = (page - 1) * perPage;

    const whereCondition: Prisma.OrderWhereInput = {
      ...(id ? { userId: id } : {}),
      ...(search || (status && status !== 'All')
        ? {
            OR: [
              ...(search
                ? [
                    {
                      invoiceNo: {
                        contains: search,
                        mode: 'insensitive',
                      },
                    } as Prisma.OrderWhereInput,
                  ]
                : []),
              ...(status && status !== 'All'
                ? [
                    {
                      status: {
                        equals: status,
                      },
                    } as Prisma.OrderWhereInput,
                  ]
                : []),
            ],
          }
        : {}),
    };

    const data = await this.DatabaseService.order.findMany({
      where: whereCondition,
      include: {
        OrderImage: true,
        OrderDetails: {
          include: {
            product: {
              include: {
                ProductImage: true,
              },
            },
          },
        },
        user: {
          select: { email: true, profile: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: Number(perPage),
    });

    const total = await this.DatabaseService.order.count({
      where: whereCondition,
    });

    if (data?.length === 0) {
      return {
        data,
      };
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
    return this.DatabaseService.order.findUnique({
      where: { id },
      select: {
        user: {
          select: {
            email: true,
            profile: true,
          },
        },
        status: true,
        invoiceNo: true,
        discount: true,
        OrderDetails: {
          include: {
            product: true,
          },
        },
        OrderImage: true,
        total: true,
        createdAt: true,
      },
    });
  }

  async update(id: number, status: string) {
    const validStatus = ['Pending', 'Processing', 'Shipped', 'Delivered'];

    if (!validStatus.includes(status)) {
      throw new Error('Invalid status value');
    }

    const product = await this.DatabaseService.order.findFirst({
      where: { id },
      select: {
        OrderDetails: {
          select: { productId: true },
        },
      },
    });

    const productIds =
      product?.OrderDetails?.map((detail) => detail.productId) || [];
    const reviewStatus = status === 'Delivered';

    await this.DatabaseService.reviewProduct.updateMany({
      where: {
        AND: [{ orderId: id }, { productId: { in: productIds } }],
      },
      data: { status: reviewStatus },
    });

    return this.DatabaseService.order.update({
      where: { id },
      data: {
        status: status as 'Pending' | 'Processing' | 'Shipped' | 'Delivered',
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async image(filename: string, orderId: number) {
    const response = await this.DatabaseService.orderDetails.findMany({
      where: {
        orderId: Number(orderId),
      },
      select: {
        product: true,
        order: {
          select: {
            id: true,
          },
        },
      },
    });

    const reviewData = response.map((item) => ({
      orderId: item.order.id,
      productId: item.product.id,
      comment: '',
      ratingMaterial: 0,
      ratingFunction: 0,
      ratingComplementary: 0,
      ratingUsed: 0,
      ratingWorth: 0,
      totalRating: 0,
      status: false,
    }));

    await this.DatabaseService.reviewProduct.createMany({
      data: reviewData,
    });

    return this.DatabaseService.orderImage.create({
      data: { url: filename, orderId: Number(orderId) },
    });
  }
}

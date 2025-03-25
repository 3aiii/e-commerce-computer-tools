import { Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CartsService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async create(
    createCartDto: Prisma.CartCreateInput & {
      userId?: number;
      productId?: number;
    },
  ) {
    const existingCart = await this.DatabaseService.cart.findFirst({
      where: {
        userId: createCartDto?.userId,
        productId: createCartDto?.productId,
      },
    });

    if (existingCart) {
      return this.DatabaseService.cart.update({
        where: { id: existingCart.id },
        data: {
          quantity: existingCart.quantity + (createCartDto.quantity ?? 0),
        },
      });
    }

    return this.DatabaseService.cart.create({
      data: {
        user: { connect: { id: createCartDto.userId } },
        product: { connect: { id: createCartDto.productId } },
        quantity: createCartDto.quantity,
      },
    });
  }

  findAll(id: number) {
    return this.DatabaseService.cart.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        quantity: true,
        product: {
          include: {
            ProductImage: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.DatabaseService.cart.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCartDto: Prisma.CartUpdateInput) {
    return this.DatabaseService.cart.update({
      where: { id },
      data: { quantity: updateCartDto.quantity },
    });
  }

  remove(id: number, delMany: boolean) {
    if (delMany) {
      return this.DatabaseService.cart.deleteMany({
        where: { userId: id },
      });
    }

    return this.DatabaseService.cart.delete({ where: { id } });
  }
}

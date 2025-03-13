import { Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CartsService {
  constructor(private readonly DatabaseService: DatabaseService) {}
  create(createCartDto: Prisma.CartCreateInput) {
    return this.DatabaseService.cart.create({
      data: createCartDto,
    });
  }

  findAll() {
    return this.DatabaseService.cart.findMany({
      select: {
        quantity: true,
        product: {
          include: {
            ProductImage: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.DatabaseService.cart.delete({ where: { id } });
  }
}

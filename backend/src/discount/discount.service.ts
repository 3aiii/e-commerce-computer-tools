import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from './../database/database.service';

@Injectable()
export class DiscountService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  create(createDiscountDto: Prisma.DiscountCreateInput) {
    return this.DatabaseService.discount.create({
      data: {
        code: createDiscountDto.code,
        discount: Number(createDiscountDto.discount),
      },
    });
  }

  async findAll(page: number, perPage: number, search: string) {
    const skip = (page - 1) * perPage;

    const whereCondition: Prisma.DiscountWhereInput = search
      ? {
          OR: [
            {
              code: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const data = await this.DatabaseService.discount.findMany({
      where: whereCondition,
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(perPage),
    });

    const total = await this.DatabaseService.discount.count({
      where: whereCondition,
    });

    if (data.length === 0) {
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
    return this.DatabaseService.discount.findUnique({
      where: { id },
    });
  }

  async useCode(code: string) {
    const data = await this.DatabaseService.discount.findFirst({
      where: {
        AND: [
          {
            code,
          },
          {
            status: true,
          },
        ],
      },
      select: {
        id: true,
        code: true,
        discount: true,
      },
    });

    if (!data) {
      throw new HttpException(
        'No discount available to use',
        HttpStatus.NOT_FOUND,
      );
    }

    return { data };
  }

  update(id: number, updateDiscountDto: Prisma.DiscountCreateInput) {
    return this.DatabaseService.discount.update({
      where: { id },
      data: {
        code: updateDiscountDto.code,
        discount: Number(updateDiscountDto.discount),
      },
    });
  }

  async remove(id: number) {
    const data = await this.DatabaseService.discount.findFirst({
      where: { id },
    });

    const updatedStatus = !data?.status;

    return this.DatabaseService.discount.update({
      where: { id: Number(id) },
      data: {
        status: updatedStatus,
      },
    });
  }
}
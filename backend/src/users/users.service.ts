import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async create(
    createUserDto: Prisma.UserCreateInput & {
      firstname?: string;
      lastname?: string;
    },
  ) {
    const hashPassword = hashSync(createUserDto.password, 10);

    const dataUser = await this.DatabaseService.user.create({
      data: {
        email: createUserDto.email,
        password: hashPassword,
        role: createUserDto.role,
      },
    });

    const dataProfile = await this.DatabaseService.profile.create({
      data: {
        userId: dataUser.id,
        firstname: createUserDto.firstname,
        lastname: createUserDto.lastname,
      },
    });

    return dataProfile;
  }

  async image(filename: string, userId: number) {
    const user = await this.DatabaseService.profile.findUnique({
      where: { id: Number(userId) },
      select: { image: true },
    });

    if (user?.image) {
      const oldImagePath = path.join(__dirname, '../../public/', user.image);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    return this.DatabaseService.profile.update({
      where: {
        id: Number(userId),
      },
      data: { image: filename },
    });
  }

  async findAll(page: number, perPage: number, search: string) {
    const skip = (page - 1) * perPage;

    const whereCondition: Prisma.UserWhereInput = search
      ? {
          OR: [
            {
              email: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const data = await this.DatabaseService.user.findMany({
      where: whereCondition,
      include: {
        profile: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(perPage),
    });

    const total = await this.DatabaseService.user.count({
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

  async findOne(id: number) {
    return this.DatabaseService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        profile: true,
      },
    });
  }

  async update(
    id: number,
    updateUserDto: Prisma.UserUpdateInput & {
      firstname?: string;
      lastname?: string;
      phone?: string;
      address?: string;
    },
  ) {
    let hashPassword: string;

    if (updateUserDto.password) {
      hashPassword = hashSync(updateUserDto.password as string, 10);
    }

    return this.DatabaseService.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id },
        data: {
          email: updateUserDto.email,
          password: hashPassword,
        },
      });

      const updatedProfile = await prisma.profile.update({
        where: { userId: id },
        data: {
          firstname: updateUserDto.firstname,
          lastname: updateUserDto.lastname,
          phone: updateUserDto.phone,
          address: updateUserDto.address,
        },
      });

      return updatedProfile;
    });
  }

  async remove(id: number) {
    const data = await this.DatabaseService.user.findFirst({
      where: { id },
    });

    const updatedStatus = !data?.status;

    return this.DatabaseService.user.update({
      where: { id: Number(id) },
      data: {
        status: updatedStatus,
      },
    });
  }
}

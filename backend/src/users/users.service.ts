import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async login(loginUserDto: Prisma.UserCreateInput) {
    return;
  }

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
      skip,
      take: Number(perPage),
    });

    const total = await this.DatabaseService.user.count({
      where: whereCondition,
    });

    if (data.length === 0) {
      throw new HttpException(
        'No users available to display',
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

  async findOne(id: number) {
    return this.DatabaseService.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.DatabaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
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

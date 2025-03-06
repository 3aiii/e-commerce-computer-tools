import { Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  create(createUserDto: Prisma.UserCreateInput) {
    return this.DatabaseService.user.create({ data: createUserDto });
  }

  findAll() {
    return this.DatabaseService.user.findMany({});
  }

  findOne(id: number) {
    return this.DatabaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.DatabaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.DatabaseService.user.delete({
      where: {
        id,
      },
    });
  }
}

import { DatabaseService } from './../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly DatabaseService: DatabaseService,
    private JwtService: JwtService,
  ) {}

  async verifyToken(token: string) {
    try {
      return this.JwtService.verify(token);
    } catch (error) {
      return null;
    }
  }

  async login(payload: any) {
    const user = await this.DatabaseService.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = compareSync(payload.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.JwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async logout(res: any) {
    res.clearCookie('user_token', { httpOnly: true });
  }
}

import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('login')
  async login(@Body() body: any, @Res({ passthrough: true }) res: any) {
    const access_token = await this.AuthService.login(body);

    res.cookie('user_token', access_token, {
      httpOnly: true,
    });

    return {
      access_token,
    };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: any) {
    if (req.cookies.user_token) {
      await this.AuthService.logout(res);
      res.clearCookie('user_token');
      return { message: 'Logged out successfully' };
    } else {
      return { message: 'No user logged in' };
    }
  }
}

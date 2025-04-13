import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/guards';
import { Response } from 'express';

@UseGuards(JwtGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: any): string {
    return this.appService.getHello();
  }

  @Get('download-pdf')
  downlaodPDF(@Res() res: Response, @Body() orderId: any) {
    this.appService.downloadPDF(res, orderId);
  }
}

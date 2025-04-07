import { Controller, Get, Post, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  findAll() {
    return this.dashboardService.getValues();
  }

  @Get('OrderPerDaySales')
  findOne() {
    return this.dashboardService.OrderPerDaySales();
  }
}

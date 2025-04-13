import { Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { startOfDay, endOfDay, subDays, format, formatDate } from 'date-fns';
import { th } from 'date-fns/locale';

@Injectable()
export class DashboardService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async getValues() {
    const products = await this.DatabaseService.product.count({
      where: {
        status: true,
      },
    });
    const categories = await this.DatabaseService.category.count({
      where: {
        status: true,
      },
    });
    const users = await this.DatabaseService.user.count({
      where: {
        status: true,
      },
    });
    const orders = await this.DatabaseService.order.aggregate({
      _sum: {
        total: true,
      },
    });

    return { products, categories, users, orders };
  }

  async OrderPerDaySales() {
    const today = new Date();
    const fromDate = subDays(today, 6);
    
    const orders = await this.DatabaseService.order.findMany({
      where: {
        createdAt: {
          gte: startOfDay(fromDate),
          lte: endOfDay(today),
        },
      },
      select: {
        createdAt: true,
        total: true,
      },
    });

    const salesMap = new Map<string, number>();

    for (let i = 0; i < 7; i++) {
      const date = subDays(today, 6 - i);
      const key = date.toISOString().split('T')[0];
      salesMap.set(key, 0);
    }

    orders.forEach((order) => {
      const dateKey = order.createdAt.toISOString().split('T')[0];
      if (salesMap.has(dateKey)) {
        salesMap.set(
          dateKey,
          (salesMap.get(dateKey) || 0) + Math.floor(order.total),
        );
      }
    });

    const salesData = Array.from(salesMap.entries()).map(([date, sales]) => {
      const buddhistYear = new Date(date).getFullYear();
      const dateObj = new Date(date);
      const formattedThaiDate =
        format(dateObj, "eeee 'ที่' d MMMM", { locale: th }) +
        ` ${buddhistYear}`;

      return {
        date: formattedThaiDate,
        sales,
      };
    });

    return salesData;
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { DiscountModule } from './discount/discount.module';
import { OrdersModule } from './orders/orders.module';
import { CartsModule } from './carts/carts.module';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [DatabaseModule, ProductsModule, UsersModule, CategoriesModule, DiscountModule, OrdersModule, CartsModule, AuthModule, ReviewsModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

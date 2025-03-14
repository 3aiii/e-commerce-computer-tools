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

@Module({
  imports: [DatabaseModule, ProductsModule, UsersModule, CategoriesModule, DiscountModule, OrdersModule, CartsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { DiscountModule } from './discount/discount.module';

@Module({
  imports: [DatabaseModule, ProductsModule, UsersModule, CategoriesModule, DiscountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

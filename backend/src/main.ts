import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  app.use('/images', express.static(join(__dirname, '..', 'public')));
  // app.use((req, res, next) => {
  //   // ตั้งค่า cookie ที่ HttpOnly และ Secure (สำหรับใช้งานใน production)
  //   res.cookie('access_token', 'your_token_value', {
  //     httpOnly: true, // ป้องกันการเข้าถึง cookies จาก JavaScript
  //     secure: process.env.NODE_ENV === 'production', // ใช้เฉพาะใน HTTPS ใน production
  //     sameSite: 'Strict', // หรือ 'Lax' ตามความเหมาะสม
  //   });

  //   next();
  // });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

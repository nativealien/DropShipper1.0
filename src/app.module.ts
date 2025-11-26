import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { User } from './users/users.entity';
import { Product } from './products/products.entity';
import { CjModule } from './integrations/cj/cj.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [User, Product],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CjModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

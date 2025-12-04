import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './routes/users/user.entity';
import { UsersModule } from './routes/users/users.module';
import { AuthModule } from './auth/auth.module';
import { Product } from './routes/products/product.entity';
import { Variant } from './routes/products/variant.entity';
import { ProductsModule } from './routes/products/products.module';
import { CatalogModule } from './routes/catalog/catalog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'devuser',
      password: 'devpass',
      database: 'devdb',
      entities: [User, Product, Variant],
      synchronize: true, // dev only!
      logging: true,     // optional but nice in dev
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CatalogModule,
  ],
})
export class AppModule {}

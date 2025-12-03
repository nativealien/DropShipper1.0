import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './routes/users/user.entity';
import { UsersModule } from './routes/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'devuser',
      password: 'devpass',
      database: 'devdb',
      entities: [User],
      synchronize: true, // dev only!
      logging: true,     // optional but nice in dev
    }),
    UsersModule,
  ],
})
export class AppModule {}

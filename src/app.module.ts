import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './env';

import { UsersModule } from './users/users.module';
import { User } from './users/models/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.PG_HOST,
      port: env.PG_PORT,
      username: env.PG_USERNAME,
      password: env.PG_PASSWORD || null,
      database: env.PG_DATABASE,
      synchronize: env.TYPEORM_SYNCHRONIZE,
      entities: [User],
      logging: env.TYPEORM_LOGGING,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

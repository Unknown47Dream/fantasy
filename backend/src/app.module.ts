import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import * as Joi from 'joi';
import { AxiosInstance, default as axios } from 'axios';
import { HttpService } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';
import CacheableLookup from 'cacheable-lookup';
import { Agent as HttpsAgent } from 'https'; // Node.js HTTPS agent
import { Agent as HttpAgent } from 'http'; // Node.js HTTP agent
// import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        DATABASE_URL: Joi.string().required(),
        PANDA_SCORE_MAIN_API_TOKEN: Joi.string().required(),
        TELEGRAM_BOT_TOKEN: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        FRONTEND_URL: Joi.string().required(),
        GRID_CENTRAL_GQL: Joi.string().required(),
        GRID_API_KEY: Joi.string().required(),
      }),
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 50,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 250,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 750,
      },
    ]),
    PrismaModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
      // useClass: ThrottlerBehindProxyGuard,
    },
    {
      provide: 'PANDA_HTTP',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const cacheableLookup = new CacheableLookup({
          cache: new Map(),
          maxTtl: 900, // 15 minutes maximum cache
        });
        const httpsAgent = new HttpsAgent();
        const httpAgent = new HttpAgent();
        cacheableLookup.install(httpsAgent);
        cacheableLookup.install(httpAgent);

        const instance: AxiosInstance = axios.create({
          baseURL: configService.get<string>('BASE_API_URL'),
          headers: {
            Authorization: `Bearer ${configService.get<string>('PANDA_SCORE_MAIN_API_TOKEN')}`,
            'Content-Type': 'application/json',
          },
          httpAgent,
          httpsAgent,
        });
        return new HttpService(instance);
      },
    },
  ],
})
export class AppModule {}

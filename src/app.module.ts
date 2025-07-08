/* Dependencies */
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

/* Middlewares */
import { AuthPort } from './middleware/ports/auth.port';
import { AuthAdapter } from './middleware/adapters/auth.adapter';
import { AuthMidleware } from './middleware/auth-middleware';

/* Config */
import { configLoader } from '@config/config-loader';
import { envSchema } from '@config/env-schema';

/* Shared Modules */
import { SharedModule } from '@shared/shared.module';

/* Features */
import { PaymentOrderModule } from './features/payment-order/payment-order.module';
import { TreasuryModule } from './features/treasury/treasury.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoader],
      validationSchema: envSchema
    }),
    SharedModule,
    HttpModule,
    PaymentOrderModule,
    TreasuryModule
  ],
  providers: [
    {
      provide: AuthPort,
      useClass: AuthAdapter
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMidleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
  }
}
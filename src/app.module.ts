/* Dependencies */
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/* Middlewares */
import { AuthPort } from './middleware/ports/auth.port';
import { AuthAdapter } from './middleware/adapters/auth.adapter';
import { AuthMiddleware } from './middleware/auth-middleware';

/* Config */
import { configLoader } from '@config/config-loader';
import { envSchema } from '@config/env-schema';

/* Shared Modules */
import { SharedModule } from '@shared/shared.module';

/* Features */
import { PaymentOrderModule } from './features/payment-order/payment-order.module';
import { TreasuryModule } from './features/treasury/treasury.module';
import { GeneralPayrollModule } from './features/general-payroll/payroll.module';
import { PayrollModule } from './features/payroll/payroll.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoader],
      validationSchema: envSchema
    }),
    SharedModule,
    PaymentOrderModule,
    TreasuryModule,
    GeneralPayrollModule,
    PayrollModule
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
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
  }
}

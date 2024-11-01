import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './config/config-loader';
import { envSchema } from './config/env-schema';
import { DatabaseModule } from './shared/modules/database.module';
import { PaymentOrderModule } from './features/payment-order/payment-order.module';
import { DescriptiveModule } from './features/descriptive/descriptive.module';

@Module({
  imports: [
    /* Dependencies */
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que ConfigService esté disponible globalmente
      load: [configLoader],
      validationSchema: envSchema
    }),

    /* Feactures or Modules */
    DatabaseModule,
    PaymentOrderModule,
    DescriptiveModule
  ],
})
export class AppModule {}
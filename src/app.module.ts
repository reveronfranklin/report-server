import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './config/config-loader';
import { envSchema } from './config/env-schema';
import { DatabaseModule } from './shared/modules/db/database.module';
import { PaymentOrderModule } from './features/payment-order/payment-order.module';
import { DescriptiveModule } from './features/descriptive/descriptive.module';
import { SupplierModule } from './features/supplier/supplier.module';
import { BeneficiaryModule } from './features/beneficiary/beneficiary.module';

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
    DescriptiveModule,
    SupplierModule,
    BeneficiaryModule
  ]
})
export class AppModule {}
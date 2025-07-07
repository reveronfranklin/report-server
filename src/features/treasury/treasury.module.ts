/* import { Module } from '@nestjs/common';
import { PaymentOrderController } from './infrastructure/controllers/payment-order.controller';
import { GeneratePaymentOrderUseCase } from './application/use-cases/generate-payment-order.use-case';
import { PaymentOrderRepository } from './infrastructure/adapters/payment-order.repository'; // Ejemplo de adaptador/repositorio
import { IPaymentOrderRepository } from './domain/ports/ip-payment-order.repository'; // Ejemplo de puerto

@Module({
  imports: [
    // Aquí puedes importar otros módulos de Nest si PaymentOrderModule los necesita (ej. TypeOrmModule)
  ],
  controllers: [PaymentOrderController],
  providers: [
    GeneratePaymentOrderUseCase,
    // Aquí registras el adaptador/implementación del repositorio para el puerto
    {
      provide: IPaymentOrderRepository, // El token/puerto que usarás para inyectar
      useClass: PaymentOrderRepository, // La implementación concreta
    },
    // ... otros servicios/providers específicos de payment-order
  ],
  // Si algo de este módulo necesita ser exportado para otros módulos que lo importen, se hace aquí
  // Pero para 'AppModule' que solo lo importa, no es estrictamente necesario que exporte cosas.
  exports: [],
})
export class PaymentOrderModule {} */
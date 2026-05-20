/* Dependencies */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // 🔥 Importamos el cliente HTTP

/* Shared Modules */
import { DatabaseModule } from './modules/db/database.module';
import { PrinterModule } from './modules/printer/printer.module';

@Module({
  imports: [
    DatabaseModule,
    PrinterModule,
    HttpModule // 🔥 Lo agregamos aquí
  ],
  exports: [
    DatabaseModule,
    PrinterModule,
    HttpModule // 🔥 Lo exportamos para que el mundo lo use
  ]
})
export class SharedModule {}
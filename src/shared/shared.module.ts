/* Dependencies */
import { Module } from '@nestjs/common';

/* Shared Modules */
import { DatabaseModule } from './modules/db/database.module';
import { PrinterModule } from './modules/printer/printer.module';

@Module({
  imports: [
    DatabaseModule,
    PrinterModule
  ],
  exports: [
    DatabaseModule,
    PrinterModule
  ]
})
export class SharedModule {}
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseSequelizeConfig } from '../../config/db/database-sequelize.config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: DatabaseSequelizeConfig // Usa la clase de configuración
    })
  ],
})
export class DatabaseModule {}
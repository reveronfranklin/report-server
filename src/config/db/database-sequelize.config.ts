import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

@Injectable()
export class DatabaseSequelizeConfig {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const config = this.configService.get('database.postgres');

    const sequelizeOptions: SequelizeModuleOptions = {
      dialect: config.connection,
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: config.synchronize,
      autoLoadModels: config.autoLoadModels,
      logging: false //config.logging
    };

    return sequelizeOptions;
  }
}
import { Module } from '@nestjs/common';
import { CatalogModule } from './ioc';
import { DatabaseModule } from './ioc/database-module/database.module';

@Module({
  imports: [DatabaseModule, CatalogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { FactoryProvider, Global, Module } from '@nestjs/common';
import { DatabaseConnection } from '~/shared/application/database';
import { SharedProviderEnum } from '../shared-constants';
import { PostgresConnectionAdapter } from '~/shared/infra/database/typeorm/connection/postgres-conection';

const databaseProvider: FactoryProvider<DatabaseConnection> = {
  provide: SharedProviderEnum.DatabaseConnection,
  useFactory: () => new PostgresConnectionAdapter().connect(),
};

@Global()
@Module({
  providers: [databaseProvider],
  exports: [SharedProviderEnum.DatabaseConnection],
})
export class DatabaseModule {}

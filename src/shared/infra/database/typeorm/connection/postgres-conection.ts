import { DataSource } from 'typeorm';
import { DatabaseConnection } from '~/shared/application/database/contracts';
import { dataSourceOptions } from './datasource-options';
import { DirectorMapping, MovieMapping, ReviewMapping } from '../mapping';

export class PostgresConnectionAdapter
  implements DatabaseConnection<DataSource>
{
  public dataSource: DataSource;

  async connect(params?: any): Promise<DatabaseConnection<DataSource>> {
    this.dataSource = new DataSource({
      ...dataSourceOptions,
      schema: params?.schema ?? 'public',
      // entities: [`${__dirname}/../mapping/*.ts`],
      entities: [DirectorMapping, ReviewMapping, MovieMapping],
      synchronize: true,
      migrations: [`${__dirname}/../migrations/*.ts`],
      logging: true,
    });
    this.dataSource = await this.dataSource.initialize();
    // TODO review - not acceptable for production
    await this.dataSource.synchronize();
    return this;
  }

  getConnection(): DataSource {
    return this.dataSource;
  }

  async close() {
    await this.dataSource.destroy();
  }
}

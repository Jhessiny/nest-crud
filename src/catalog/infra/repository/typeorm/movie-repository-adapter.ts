import { DataSource } from 'typeorm';
import { MovieRepository } from '~/catalog/application';
import { DatabaseConnection } from '~/shared/application/database';
import {
  MovieMapping,
  ReviewMapping,
} from '~/shared/infra/database/typeorm/mapping';

export class MovieRepositoryAdapter implements MovieRepository {
  constructor(private readonly connection: DatabaseConnection<DataSource>) {}
  async delete(id: string) {
    await this.connection.getConnection().transaction(async (manager) => {
      await manager.getRepository(MovieMapping).delete(id);
      await manager.getRepository(ReviewMapping).delete({ movieId: id });
    });
  }
}

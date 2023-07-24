import { Director } from '~/catalog/domain/entities/director';

export interface DirectorRepository {
  save(input: Director): Promise<Director>;
  findOne(name: string): Promise<Director>;
}

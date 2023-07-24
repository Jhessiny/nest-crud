import { MovieDAO } from '../query';
import { GetMovieService } from './contracts';

export class GetMovieServiceAdapter implements GetMovieService {
  constructor(private readonly getMovieDao: MovieDAO) {}

  async execute({
    id,
  }: GetMovieService.InputDTO): Promise<GetMovieService.OutputDTO> {
    const reviewOrError = await this.getMovieDao.findOneById(id);
    return reviewOrError;
  }
}

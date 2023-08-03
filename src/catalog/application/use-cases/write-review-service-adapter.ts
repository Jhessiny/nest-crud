import { WriteReviewService } from './contracts';
import { MovieRepository } from '../repository';
import { Movie } from '~/catalog/domain';
import { IdGenerator } from '~/shared/infra/id-generator';

export class WriteReviewServiceAdapter implements WriteReviewService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute({
    authorName,
    text,
    movie,
  }: WriteReviewService.InputDTO): Promise<void> {
    const movieExists = await this.movieRepository.findOne({
      name: movie.name,
      premiereDate: movie.premiereDate,
    });

    const movieId = movieExists?.getState().id ?? IdGenerator.generate();

    const movieData = {
      id: movieId,
      name: movie.name,
      premiereDate: movie.premiereDate,
      director: {
        id:
          movieExists?.getState().director.getState().id ??
          IdGenerator.generate(),
        birthDate: movie.director.birthDate,
        name: movie.director.name,
        prizes: movie.director.prizes,
      },
      reviews: [{ text, authorName }],
    };

    const movieInstance = Movie.create(movieData);
    await this.movieRepository.save(movieInstance);
  }
}

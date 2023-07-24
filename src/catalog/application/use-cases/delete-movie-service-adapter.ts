import { MovieRepository } from '../repository';
import { DeleteMovieService } from './contracts/delete-movie';

export class DeleteMovieServiceAdapter implements DeleteMovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute({
    id,
  }: DeleteMovieService.InputDTO): Promise<DeleteMovieService.OutputDTO> {
    await this.movieRepository.delete(id);
  }
}

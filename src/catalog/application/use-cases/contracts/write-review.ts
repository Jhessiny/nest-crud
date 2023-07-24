export interface WriteReviewService {
  execute: (
    input: WriteReviewService.InputDTO,
  ) => Promise<WriteReviewService.OutputDTO>;
}

export namespace WriteReviewService {
  export type InputDTO = {
    authorName: string;
    text: string;
    movie: Movie;
  };

  export type Movie = {
    name: string;
    premiereDate: Date;
    director: Director;
  };

  export type Director = {
    name: string;
    birthDate: Date;
    prizes: string[];
  };

  export type OutputDTO = {
    authorName: string;
    text: string;
    movieId: string;
    id: string;
  };
}

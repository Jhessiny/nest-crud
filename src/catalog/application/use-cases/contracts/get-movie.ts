export interface GetMovieService {
  execute: (id: GetMovieService.InputDTO) => Promise<GetMovieService.OutputDTO>;
}

export namespace GetMovieService {
  export type InputDTO = {
    id: string;
  };
  export type OutputDTO = {
    name: string;
    premiereDate: Date;
    director: Director;
    reviews: Review[];
  };

  export type Review = {
    authorName: string;
    text: string;
  };

  export type Director = {
    name: string;
    birthDate: Date;
    prizes: string[];
  };
}

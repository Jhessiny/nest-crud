export interface DeleteMovieService {
  execute: (
    input: DeleteMovieService.InputDTO,
  ) => Promise<DeleteMovieService.OutputDTO>;
}

export namespace DeleteMovieService {
  export type InputDTO = {
    id: string;
  };
  export type OutputDTO = void;
}

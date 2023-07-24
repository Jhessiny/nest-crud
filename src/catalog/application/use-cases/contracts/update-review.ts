export interface UpdateReviewService {
  execute: (
    input: UpdateReviewService.InputDTO,
  ) => Promise<UpdateReviewService.OutputDTO>;
}

export namespace UpdateReviewService {
  export type InputDTO = {
    authorName: string;
    text: string;
    movieId: string;
  };
  export type OutputDTO = void;
}

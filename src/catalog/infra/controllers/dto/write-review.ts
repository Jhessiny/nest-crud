export type WriteReviewDTO = {
  authorName: string;
  text: string;
  movie: {
    name: string;
    premiereDate: Date;
    director: {
      name: string;
      birthDate: Date;
      prizes: string[];
    };
  };
};

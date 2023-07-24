export interface MovieDAO {
  findOneById(name: string): Promise<MovieDAO.OutputDTO>;
}

export namespace MovieDAO {
  export type OutputDTO = {
    id: string;
    name: string;
    premiereDate: Date;
    director: {
      name: string;
      birthDate: Date;
      prizes: string[];
    };
    reviews: Array<{
      id: string;
      authorName: string;
      text: string;
    }>;
  };
}

export interface MovieRepository {
  delete(id: string): Promise<void>;
}

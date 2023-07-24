export interface DatabaseConnection<T = any> {
  close(): Promise<void>;
  connect(params: any): Promise<DatabaseConnection<T>>;
  getConnection(): T;
}

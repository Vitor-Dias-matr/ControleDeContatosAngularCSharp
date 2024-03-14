export interface Response<T> {
  data: T;
  status: Status;
}

export interface Status {
  code: number;
  message: string;
}

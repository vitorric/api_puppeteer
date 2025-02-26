export type TReturnFn<T> = {
  error: boolean | string | string[];
  return: T;
};

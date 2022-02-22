export type Result<T> =
 | { value: T, hasError: false }
 | { value?: undefined, hasError: true }
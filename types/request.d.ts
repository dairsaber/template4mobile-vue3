// 通用的model类型声明
declare type QueryParams = Recordable<string | number | null | undefined>

declare type PaginationList<T = unknown> = {
  rows: T[]
  total: number
}

declare interface Result<T = unknown> {
  code: number
  success: boolean
  msg: string
  data: T
}

declare type PromiseResult<T> = Promise<Result<T>>

declare type PaginationResult<T> = Result<PaginationList<T>>

declare type PromisePaginationResult<T> = Promise<PaginationResult<T>>

import { errorMssgs } from '../lang'

export interface Pagination {
  pageNumber: number
  pageSize: number
}

export type ErrorMssgKey = keyof typeof errorMssgs.en

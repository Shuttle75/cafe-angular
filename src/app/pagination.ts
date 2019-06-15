export interface PaginationPropertyPageable {
  sort?: PaginationPropertySort;
  pageSize?: number;
  pageNumber?: number;
  offset?: number;
  paged?: boolean;
  unpaged?: boolean;
}

export interface PaginationPropertySort {
  sorted?: boolean;
  unsorted?: boolean;
  empty?: boolean;
}

export interface PaginationPage<T> {
  content?: Array<T>;
  sort?: PaginationPropertySort;
  totalPages?: number;
  totalElements?: number;
  last?: boolean;
  first?: boolean;
  numberOfElements?: number;
  size: number;
  number: number;
  empty?: boolean;
}


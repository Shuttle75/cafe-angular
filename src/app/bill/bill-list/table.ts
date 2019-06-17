export interface Table<T> {
    fetchPage(page: number, size: number, sort: string);
}

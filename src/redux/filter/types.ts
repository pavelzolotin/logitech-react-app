export interface FilterSliceState {
    searchValue: string;
    categoryId: any;
    currentPage: number;
    filterId: any;
    sort: Sort;
}

export type Sort = {
    id: number;
    title: string;
    sortProperty: SortPropertyEnum;
}

export enum SortPropertyEnum {
    rating = 'rating',
    title = 'title',
    price = 'price'
}
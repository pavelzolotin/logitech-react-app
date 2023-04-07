export type Sort = {
    title: string;
    sortProperty: 'title' | 'rating' | 'price';
};

export interface FilterSliceState {
    searchValue: string;
    categoryId: any;
    currentPage: number;
    filterId: any;
    sort: Sort;
}
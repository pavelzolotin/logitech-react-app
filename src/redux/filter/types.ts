export interface FilterSliceState {
    searchValue: string;
    categoryId: any;
    currentPage: number;
    filterId: any;
    sort: {
        id: number;
        title: string;
        sortProperty: string;
    };
}
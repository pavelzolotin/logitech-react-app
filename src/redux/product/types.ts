export type FetchProductsArgs = {
    type: string;
    currentPage: number;
    category: string | number;
    search: string;
    filter: string | number;
    sortType: string;
    orderType: string;
};

export type Product = {
    id: string;
    title: string;
    price: number;
    imageUrl: string[];
    activeColor: number;
    colors: object[];
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface ProductSliceState {
    products: Product[];
    type: string;
    status: Status;
}
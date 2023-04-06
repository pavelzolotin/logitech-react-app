import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

import {RootState} from '../store';
import Sort from '../slices/filterSlice';

export type FetchProductsArgs = {
    type: string;
    currentPage: number;
    category: number;
    search: string;
    filter: number;
    sortType: Sort;
    orderType: string;
};

export const fetchProducts = createAsyncThunk<Product[], FetchProductsArgs>(
    'item/fetchProducts',
    async (params) => {
        const {type, currentPage, category, search, filter, sortType, orderType} = params;
        const {data} = await axios.get<Product[]>(
            `https://6407307d862956433e676ec6.mockapi.io/${type}?page=${currentPage}&${category}&${search}&${filter}&sortBy=${sortType}&order=${orderType}`
        );

        return data;
    }
);

type Product = {
    id: string;
    title: string;
    price: number;
    imageUrl: string[];
    activeColor: number;
    colors: object[];
}

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface ProductSliceState {
    products: Product[];
    type: 'mice' | 'keyboards';
    status: Status;
}

const initialState: ProductSliceState = {
    products: [],
    type: 'mice',
    status: Status.LOADING
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setType(state, action: PayloadAction<string>) {
            state.type = action.payload;
        },
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(fetchProducts.pending, (state: any) => {
            state.status = Status.LOADING;
            state.products = [];
        })
        builder.addCase(fetchProducts.fulfilled, (state: any, action: any) => {
            state.products = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchProducts.rejected, (state: any) => {
            state.status = Status.ERROR;
            state.products = [];
        })
    }
});

export const productSelector = (state: RootState) => state.product;

export const {setType, setProducts} = productSlice.actions;

export default productSlice.reducer;
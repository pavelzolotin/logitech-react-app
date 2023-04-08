import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductSliceState, Status, Product } from './types';
import { fetchProducts } from './asyncActions';

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

export const {setType, setProducts} = productSlice.actions;

export default productSlice.reducer;
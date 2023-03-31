import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('item/fetchProducts', async (params) => {
        const {type, currentPage, category, search, filter, sortType, orderType} = params;
        const {data} = await axios.get(
            `https://6407307d862956433e676ec6.mockapi.io/${type}?page=${currentPage}&${category}&${search}&${filter}&sortBy=${sortType}&order=${orderType}`
        );

        return data;
    }
);

const initialState = {
    products: [],
    type: 'mice',
    status: 'loading'
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setType(state, action) {
            state.type = action.payload;
        },
        setProducts(state, action) {
            state.products = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.products = [];
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.status = 'success';
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'error';
                state.products = [];
            })
    }
});

export const productSelector = (state) => state.products;

export const {setType, setProducts} = productSlice.actions;

export default productSlice.reducer;
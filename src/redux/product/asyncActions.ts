import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { FetchProductsArgs, Product } from './types';

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
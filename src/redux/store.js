import {configureStore} from '@reduxjs/toolkit';

import products from './slices/productSlice';
import filters from './slices/filterSlice';
import search from './slices/searchSlice';
import mode from './slices/themeSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        products,
        filters,
        search,
        mode,
        cart
    },
});
import {configureStore} from '@reduxjs/toolkit';

import products from './slices/productSlice';
import filters from './slices/filterSlice';
import theme from './slices/themeSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        products,
        filters,
        theme,
        cart
    },
});
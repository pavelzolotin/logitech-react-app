import {configureStore} from '@reduxjs/toolkit';

import filters from './slices/filterSlice';
import search from './slices/searchSlice';
import mode from './slices/themeSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        filters,
        search,
        mode,
        cart
    },
});
import {configureStore} from '@reduxjs/toolkit';

import filter from './slices/filterSlice';
import search from './slices/searchSlice';
import mode from './slices/themeSlice';

export const store = configureStore({
    reducer: {
        filter,
        search,
        mode
    },
});
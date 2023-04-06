import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

import productSlice from './slices/productSlice';
import filterSlice from './slices/filterSlice';
import themeSlice from './slices/themeSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        product: productSlice,
        filter: filterSlice,
        theme: themeSlice,
        cart: cartSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
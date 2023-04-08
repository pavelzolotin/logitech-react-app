import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import productSlice from './product/slice';
import filterSlice from './filter/slice';
import themeSlice from './themeMode/slice';
import cartSlice from './cart/slice';

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
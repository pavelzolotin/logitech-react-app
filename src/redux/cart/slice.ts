import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItem, CartSliceState } from './types';
import { cartStorage } from '../../utils/getCartLocalStorage';
import { totalPriceCalc } from '../../utils/totalPriceCalc';

const {items, totalPrice} = cartStorage();

const initialState: CartSliceState = {
    totalPrice,
    items
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            findItem
                ? findItem.count++
                : state.items.push({
                    ...action.payload,
                    count: 1
                });

            state.totalPrice = totalPriceCalc(state.items);
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
                state.totalPrice -= findItem.price;
            }
            if (state.totalPrice === 0) {
                state.items = [];
                state.totalPrice = 0;
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem) {
                state.items = state.items.filter(obj => obj.id !== action.payload);
                state.totalPrice -= findItem.price;
            }
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});

export const {addItem, minusItem, removeItem, clearItems} = cartSlice.actions;

export default cartSlice.reducer;
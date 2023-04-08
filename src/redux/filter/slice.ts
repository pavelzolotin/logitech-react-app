import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterSliceState } from './types';
import {SortPropertyEnum} from '../filter/types';

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: localStorage.getItem('category') || 0,
    currentPage: 1,
    filterId: localStorage.getItem('filters'),
    sort: {
        id: 0,
        title: 'популярности',
        sortProperty: SortPropertyEnum.price
    }
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCategoryId(state, action: PayloadAction<any>) {
            state.categoryId = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if(Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage);
                state.categoryId = Number(action.payload.categoryId);
                state.sort = action.payload.sort;
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    id: 0,
                    title: 'популярности',
                    sortProperty: SortPropertyEnum.rating
                }
            }
        },
        setFilterId(state, action: PayloadAction<string>) {
            state.filterId = action.payload;
        }
    }
});

export const {
    setSearchValue,
    setCategoryId,
    setCurrentPage,
    setFilters,
    setFilterId
} = filterSlice.actions;

export default filterSlice.reducer;
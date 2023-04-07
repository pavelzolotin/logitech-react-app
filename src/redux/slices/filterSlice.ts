import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../store';

export type Sort = {
    title: string;
    sortProperty: 'title' | 'rating' | 'price';
}

export interface FilterSliceState {
    searchValue: string;
    categoryId: any;
    currentPage: number;
    filterId: any;
    sort: Sort;
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: localStorage.getItem('category') || 0,
    currentPage: 1,
    filterId: localStorage.getItem('filters'),
    sort: {title: 'популярности', sortProperty: 'rating'}
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
        },
        setFilterId(state, action: PayloadAction<string>) {
            state.filterId = action.payload;
        }
    }
});

export const filterSelector = (state: RootState) => state.filter;

export const {
    setSearchValue,
    setCategoryId,
    setCurrentPage,
    setFilters,
    setFilterId
} = filterSlice.actions;

export default filterSlice.reducer;
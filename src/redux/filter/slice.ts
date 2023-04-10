import { createSlice } from '@reduxjs/toolkit';

import { FilterSliceState } from './types';

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: localStorage.getItem('category') || 0,
    currentPage: 1,
    filterId: localStorage.getItem('filters')
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
            state.filterId = Number(action.payload.filterId);
        },
        setFilterId(state, action) {
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
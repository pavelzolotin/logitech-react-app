import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../store';

const sortStorage = localStorage.getItem('sorted');

export type Sort = {
    title: string;
    sortProperty: 'title' | 'rating' | 'price';
}

export interface FilterSliceState {
    searchValue: string;
    categoryId: any;
    currentPage: number;
    orderType: string;
    sort: Sort;
    filterId: any;
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: localStorage.getItem('category') || 0,
    currentPage: 1,
    orderType: localStorage.getItem('order') || 'asc',
    sort: sortStorage ? JSON.parse(sortStorage) : {title: 'популярности', sortProperty: 'rating'},
    filterId: localStorage.getItem('filters')
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
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setOrderType(state, action: PayloadAction<string>) {
            state.orderType = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.sort = action.payload.sort;
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
    setSort,
    setOrderType,
    setCurrentPage,
    setFilters,
    setFilterId
} = filterSlice.actions;

export default filterSlice.reducer;
import {createSlice} from '@reduxjs/toolkit';

const sortStorage = localStorage.getItem('sorted');

const initialState = {
    searchValue: '',
    categoryId: localStorage.getItem('category') || 0,
    currentPage: 1,
    orderType: localStorage.getItem('order') || 'asc',
    sort: sortStorage ? JSON.parse(sortStorage) : {title: 'популярности', sortProperty: 'rating'},
    filterId: localStorage.getItem('filters')
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setOrderType(state, action) {
            state.orderType = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
        },
        setFilterId(state, action) {
            state.filterId = action.payload;
        }
    }
});

export const filterSelector = (state) => state.filters;

export const {setSearchValue, setCategoryId, setSort, setOrderType, setCurrentPage, setFilters, setFilterId} = filterSlice.actions;

export default filterSlice.reducer;
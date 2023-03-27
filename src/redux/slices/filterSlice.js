import {createSlice} from '@reduxjs/toolkit';

const sortStorage = localStorage.getItem('sorted');

const initialState = {
    categoryId: localStorage.getItem('category') || 0,
    currentPage: 1,
    orderType: localStorage.getItem('order') || 'asc',
    sort: sortStorage ? JSON.parse(sortStorage) : {title: 'популярности', sortProperty: 'rating'},
    filterId: localStorage.getItem('filters'),
    isVisible: false
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setOrderType(state, action) {
            state.orderType = action.payload;
        },
        setIsVisible(state, action) {
            state.isVisible = action.payload;
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

export const {setCategoryId, setSort, setOrderType, setIsVisible, setCurrentPage, setFilters, setFilterId} = filterSlice.actions;

export default filterSlice.reducer;
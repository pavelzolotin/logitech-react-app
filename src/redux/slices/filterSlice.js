import {createSlice} from '@reduxjs/toolkit';

const sortLocalStorage = localStorage.getItem('sorted') || {title: 'популярности', sortProperty: 'rating'};
const categoryLocalStorage = localStorage.getItem('category') || 0;
const orderTypeLocalStorage = localStorage.getItem('order') || 'asc';

const initialState = {
    categoryId: categoryLocalStorage,
    currentPage: 1,
    orderType: orderTypeLocalStorage,
    sort: JSON.parse(sortLocalStorage),
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
        }
    }
});

export const {setCategoryId, setSort, setOrderType, setIsVisible, setCurrentPage} = filterSlice.actions;

export default filterSlice.reducer;
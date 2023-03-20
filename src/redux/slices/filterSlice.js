import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    categoryId: localStorage.getItem('category') || 0,
    orderType: 'asc',
    sort: {
        title: 'популярности',
        sortProperty: 'rating'
    },
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
        }
    }
});

export const {setCategoryId, setSort, setOrderType, setIsVisible} = filterSlice.actions;

export default filterSlice.reducer;
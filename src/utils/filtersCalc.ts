import { filtersKeyboards, filtersMice } from './constants';

export const filtersMiceArr = [];
export const filtersKeyboardsArr = [];

const filterSort = (filters, arr) => {
    const filtersSorted = filters.map(filter => (
        filter.sort.map(item => (
            arr.push(item)
        ))
    ));

    return filtersSorted;
};

filterSort(filtersMice, filtersMiceArr);
filterSort(filtersKeyboards, filtersKeyboardsArr);
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ThemeSliceState {
    theme: string;
}

const initialState: ThemeSliceState = {
    theme: localStorage.getItem('theme') || 'light'
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<string>) {
            state.theme = action.payload;
        }
    }
});

export const themeSelector = (state: any) => state.theme;

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState: {
    scrollPosition: 0,
    activeColor: 'from-teal-500',
  },
  reducers:{
    updateScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
    updateActiveColor: (state, action) => {
      state.activeColor = action.payload;
    }
  }
})

export const { updateScrollPosition, updateActiveColor } = scrollSlice.actions;
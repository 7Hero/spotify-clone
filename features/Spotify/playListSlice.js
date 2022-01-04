import {createSlice, configureStore} from '@reduxjs/toolkit';
import { scrollSlice } from '../PlaylistScroll/PlaylistScrollSlice';
const playlistIdSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlistId: "37i9dQZF1EJzo0LfmKU2ED",
    playlistData: null,
  },
  reducers: {
    updatePlaylistId: (state, action) => {
      state.playlistId = action.payload;
    },
    updatePlaylist: (state, action) =>{
      state.playlistData = action.payload;
    } 
  }
})

export const { updatePlaylist, updatePlaylistId } = playlistIdSlice.actions;

export const store = configureStore({
  reducer: {
    playlist: playlistIdSlice.reducer,
    scroll: scrollSlice.reducer,
  }
})
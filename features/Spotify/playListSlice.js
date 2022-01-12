import {createSlice, configureStore} from '@reduxjs/toolkit';
import { scrollSlice } from '../PlaylistScroll/PlaylistScrollSlice';
const playlistIdSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlistId: "37i9dQZF1EJzo0LfmKU2ED",
    playlistData: null,
    currentTrackData: {
      track: null,
      context: null,
    },
    playbackState: null,
  },
  reducers: {
    updatePlaylistId: (state, action) => {
      state.playlistId = action.payload;
    },
    updatePlaylist: (state, action) =>{
      state.playlistData = action.payload;
    },
    updateTrackData: (state, action) => {
      state.currentTrackData = action.payload;
    },
    updatePlaybackState: (state, action) => {
      state.playbackState = action.payload;
    }
  }
})

export const { updatePlaylist, updatePlaylistId, updateTrackData, updatePlaybackState } = playlistIdSlice.actions;

export const store = configureStore({
  reducer: {
    playlist: playlistIdSlice.reducer,
    scroll: scrollSlice.reducer,
  }
})
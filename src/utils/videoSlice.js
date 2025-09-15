import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    searchResults: [],
    loading: false,
    error: null,
    searchQuery: "",
    selectedCategory: "All",
  },
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = "";
    },
  },
});

export const {
  setVideos,
  setSearchResults,
  setLoading,
  setError,
  setSearchQuery,
  setSelectedCategory,
  clearSearchResults,
} = videoSlice.actions;

export default videoSlice.reducer;

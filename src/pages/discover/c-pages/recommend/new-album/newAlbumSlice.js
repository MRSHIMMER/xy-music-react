import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getNewAlbums } from "@/services/recommend";

const initialState = {
	newAlbums: [],
	status: "idle",
	error: null,
};

export const fetchNewAlbum = createAsyncThunk(
	"newAlbum/fetchNewAlbum",
	async () => {
		const response = await getNewAlbums();
		return response.weekData.slice(0, 10);
	}
);

const newAlbumSlice = createSlice({
	name: "newAlbum",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchNewAlbum.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchNewAlbum.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.newAlbums = state.newAlbums.concat(action.payload);
		},
	},
});

export default newAlbumSlice.reducer;
export const selectNewAlbums = (state) => state.newAlbum.newAlbums;

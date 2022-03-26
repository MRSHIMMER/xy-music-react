import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getSongDetail } from "@/services/player";

const initialState = {
	currentSongIndex: 0,
	currentSong: {},
	playList: [],
	status: "idle",
};

export const fetchPlayer = createAsyncThunk("player", async (ids) => {
	const response = await getSongDetail(ids);
	return response.songs[0];
});

const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		changeCurrentSongIndex(state, action) {
			state.currentSongIndex = action.payload;
		},
		changeCurrentSong(state, action) {
			state.currentSong = action.payload;
		},
		changePlayList(state, action) {
			state.playList = action.payload;
		},
	},
	extraReducers: {
		[fetchPlayer.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchPlayer.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.currentSong = action.payload;
		},
		[fetchPlayer.rejected]: (state, action) => {
			state.status = "failed";
		},
	},
});

export const { changeCurrentSong, changeCurrentSongIndex, changePlayList } = playerSlice.actions;
export default playerSlice.reducer;
export const selectCurrentSong = (state) => state.player.currentSong;

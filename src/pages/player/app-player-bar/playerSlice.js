import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getSongDetail } from "@/services/player";

const initialState = {
	currentSong: {},
	status: "idle",
};

export const fetchPlayer = createAsyncThunk("player", async () => {
	const response = await getSongDetail(1901371647);
	return response.songs[0];
});

const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {},
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

export default playerSlice.reducer;
export const selectCurrentSong = (state) => state.player.currentSong;

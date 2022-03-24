import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getTopList } from "@/services/recommend";
import { SOAR_RANKING_ID, NEWSONG_RANKING_ID, ORIGINAL_RANKING_ID } from "@/common/contants";

const initialState = {
	soarRanking: {},
	newsongRanking: {},
	originalRanking: {},
	status: "idle",
};

export const fetchRanking = createAsyncThunk("ranking/fetchRanking", async () => {
	const soarRankingTemp = await getTopList(SOAR_RANKING_ID);
	const newsongRankingTemp = await getTopList(NEWSONG_RANKING_ID);
	const originalRankingTemp = await getTopList(ORIGINAL_RANKING_ID);

	//需改进
	soarRankingTemp.playlist.tracks = soarRankingTemp.playlist.tracks.splice(0, 10);
	newsongRankingTemp.playlist.tracks = newsongRankingTemp.playlist.tracks.splice(0, 10);
	originalRankingTemp.playlist.tracks = originalRankingTemp.playlist.tracks.splice(0, 10);

	const response = {
		soarRanking: soarRankingTemp.playlist,
		newsongRanking: newsongRankingTemp.playlist,
		originalRanking: originalRankingTemp.playlist,
	};
	return response;
});

const rankingSlice = createSlice({
	name: "ranking",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchRanking.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchRanking.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.soarRanking = Object.assign(state.soarRanking, action.payload.soarRanking);
			state.newsongRanking = Object.assign(state.newsongRanking, action.payload.newsongRanking);
			state.originalRanking = Object.assign(state.originalRanking, action.payload.originalRanking);
		},
	},
});

export default rankingSlice.reducer;
export const selectRanking = (state) => state.ranking;

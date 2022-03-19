import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getTopBanners } from "@/services/recommend";
import request from "@/services/request";

let banners = getTopBanners();
const initialState = {
	recommend: [],
	status: "idle",
	error: null,
};

export const fetchRecommend = createAsyncThunk(
	"recommend/fetchRecommend",
	async () => {
		const response = await request({
			url: "/banner",
		});
		return response;
	}
);

const recommendSlice = createSlice({
	name: "recommend",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchRecommend.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchRecommend.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.recommend = state.recommend.concat(action.payload.banners);
		},
		[fetchRecommend.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export default recommendSlice.reducer;

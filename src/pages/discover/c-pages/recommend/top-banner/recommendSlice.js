import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getTopBanners } from "@/services/recommend";
// import request from "@/services/request";

const initialState = {
	topBanners: [],
	status: "idle",
	error: null,
};

export const fetchRecommend = createAsyncThunk(
	"recommend/fetchRecommend",
	async () => {
		const response = await getTopBanners();
		return response.banners;
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
			state.topBanners = state.topBanners.concat(action.payload);
		},
		[fetchRecommend.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export default recommendSlice.reducer;
export const selectTopBanners = (state) => state.recommend.topBanners;

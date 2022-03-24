import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHotRecommends } from "@/services/recommend";

const initialState = {
	recommendAlbum: [],
	status: "idle",
	error: null,
};

export const fetchHotRecommend = createAsyncThunk(
	"hotRecommend/fetchHotRecommend",
	async () => {
		const response = await getHotRecommends(8);
		return response.result;
	}
);

const hotRecommendSlice = createSlice({
	name: "hotRecommend",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchHotRecommend.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchHotRecommend.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.recommendAlbum = state.recommendAlbum.concat(action.payload);
		},
		[fetchHotRecommend.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export default hotRecommendSlice.reducer;

export const selectRecommendAlbum = (state) =>
	state.hotRecommend.recommendAlbum;

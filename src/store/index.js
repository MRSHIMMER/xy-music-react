import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from "@/pages/discover/c-pages/recommend/recommendSlice";

export default configureStore({
	reducer: {
		recommend: recommendReducer,
	},
});

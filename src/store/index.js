import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from "@/pages/discover/c-pages/recommend/top-banner/recommendSlice";
import hotRecommendReducer from "@/pages/discover/c-pages/recommend/hot-recommend/hotRecommendSlice";
import newAlbumReducer from "@/pages/discover/c-pages/recommend/new-album/newAlbumSlice";
import rankingReducer from "@/pages/discover/c-pages/recommend/recommend-ranking/rankingSlice";

export default configureStore({
	reducer: {
		recommend: recommendReducer,
		hotRecommend: hotRecommendReducer,
		newAlbum: newAlbumReducer,
		ranking: rankingReducer,
	},
});

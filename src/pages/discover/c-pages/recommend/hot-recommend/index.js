import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectRecommendAlbum, fetchHotRecommend } from "./hotRecommendSlice";

import SongsCover from "@/components/songs-cover";
import ThemeHeaderRCM from "@/components/theme-header-rcm";
import { HotRecommendWrapper } from "./style";

const HotRecommend = memo(() => {
	const dispatch = useDispatch();
	const hotRecommend = useSelector(selectRecommendAlbum);
	const hotRecommendStatus = useSelector((state) => state.hotRecommend.status);

	useEffect(() => {
		if (hotRecommendStatus === "idle") dispatch(fetchHotRecommend());
	}, [hotRecommendStatus, dispatch]);

	return (
		<HotRecommendWrapper>
			<ThemeHeaderRCM
				title="热门推荐"
				keywords={["华语", "流行", "民谣", "摇滚", "电子"]}
			/>
			<div className="recommend-list">
				{hotRecommend.map((item, index) => {
					return <SongsCover key={item.id} info={item}></SongsCover>;
				})}
			</div>
		</HotRecommendWrapper>
	);
});

export default HotRecommend;

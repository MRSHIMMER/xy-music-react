import React, { memo } from "react";

import TopBanner from "./top-banner";
import HotRecommend from "./hot-recommend";
import NewAlbum from "./new-album";
import RecommendRanking from "./recommend-ranking";

import {
	RecommendWrapper,
	Content,
	RecommendLeft,
	RecommendRight,
} from "./style";

const Recommend = memo(() => {
	return (
		<RecommendWrapper>
			<TopBanner />
			<Content className="wrap-v2">
				<RecommendLeft>
					<HotRecommend></HotRecommend>
					<NewAlbum></NewAlbum>
					<RecommendRanking></RecommendRanking>
				</RecommendLeft>
				<RecommendRight></RecommendRight>
			</Content>
		</RecommendWrapper>
	);
});

export default Recommend;

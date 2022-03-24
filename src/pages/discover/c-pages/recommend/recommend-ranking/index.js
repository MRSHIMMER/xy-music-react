import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRanking, selectRanking } from "./rankingSlice";

import TopRanking from "@/components/top-ranking";
import ThemeHeaderRCM from "@/components/theme-header-rcm";
import { RankingWrapper } from "./style";

const RecommendRanking = memo(() => {
	const dispatch = useDispatch();
	const ranking = useSelector(selectRanking);
	const rankingStatus = useSelector((state) => state.ranking.status);

	const { soarRanking, newsongRanking, originalRanking } = ranking;

	// console.log(originalRanking);

	// console.log(originalRanking.name);
	// console.log(originalRanking.tracks);

	useEffect(() => {
		if (rankingStatus === "idle") dispatch(fetchRanking());
	}, [dispatch, rankingStatus]);

	return (
		<RankingWrapper>
			<ThemeHeaderRCM title="榜单"></ThemeHeaderRCM>
			<div className="tops">
				<TopRanking info={soarRanking}></TopRanking>
				<TopRanking info={newsongRanking}></TopRanking>
				<TopRanking info={originalRanking}></TopRanking>
			</div>
		</RankingWrapper>
	);
});

export default RecommendRanking;

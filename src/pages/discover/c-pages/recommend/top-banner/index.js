import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchRecommend, selectTopBanners } from "../recommendSlice";

import { Carousel } from "antd";
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from "./style";

const TopBanner = memo(() => {
	const dispatch = useDispatch();
	const topBanners = useSelector(selectTopBanners);
	const recommendStatus = useSelector((state) => state.recommend.status);

	useEffect(() => {
		if (recommendStatus === "idle") dispatch(fetchRecommend());
	}, [recommendStatus, dispatch]);

	return (
		<BannerWrapper>
			<div className="banner wrap-v2">
				<BannerLeft>
					<Carousel effect="fade" autoplay>
						{topBanners.map((item, index) => {
							return (
								<div className="banner-item" key={item.imageUrl}>
									<img
										className="image"
										src={item.imageUrl}
										alt={item.typeTitle}
									></img>
								</div>
							);
						})}
					</Carousel>
				</BannerLeft>
				<BannerRight></BannerRight>
				<BannerControl></BannerControl>
			</div>
		</BannerWrapper>
	);
});

export default TopBanner;

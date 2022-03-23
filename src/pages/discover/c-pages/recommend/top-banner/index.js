import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchRecommend, selectTopBanners } from "../recommendSlice";

import { Carousel } from "antd";
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from "./style";

const TopBanner = memo(() => {
	//组件state
	const [currentIndex, setCurrentIndex] = useState(0);

	//redux相关
	const dispatch = useDispatch();
	const topBanners = useSelector(selectTopBanners);
	const recommendStatus = useSelector((state) => state.recommend.status);

	//其他hooks
	const bannerRef = useRef();
	useEffect(() => {
		if (recommendStatus === "idle") dispatch(fetchRecommend());
	}, [recommendStatus, dispatch]);

	const bannerChange = useCallback((from, to) => {
		setTimeout(() => {
			setCurrentIndex(to);
		}, 0);
	}, []);
	//其他业务逻辑
	//初始topBanners是空的，取值会有undefined报错
	const bgImage =
		topBanners[currentIndex] &&
		topBanners[currentIndex].imageUrl + "?imageView&blur=40x20";

	return (
		<BannerWrapper bgImage={bgImage}>
			<div className="banner wrap-v2">
				<BannerLeft>
					<Carousel
						effect="fade"
						autoplay
						ref={bannerRef}
						beforeChange={bannerChange}
					>
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
				<BannerControl>
					<button
						className="btn left"
						onClick={(e) => {
							bannerRef.current.prev();
						}}
					></button>
					<button
						className="btn right"
						onClick={(e) => {
							bannerRef.current.next();
						}}
					></button>
				</BannerControl>
			</div>
		</BannerWrapper>
	);
});

export default TopBanner;

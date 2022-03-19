import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommend } from "./recommendSlice";

const Recommend = memo(() => {
	const dispatch = useDispatch();

	const recommendStatus = useSelector((state) => state.recommend.status);
	useEffect(() => {
		if (recommendStatus === "idle") dispatch(fetchRecommend());
	}, [recommendStatus, dispatch]);
	return <div>Recommend</div>;
});

export default Recommend;

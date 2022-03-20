import React, { memo } from "react";

import TopBanner from "./top-banner";
import { RecommendWrapper } from "./style";

const Recommend = memo(() => {
	return (
		<RecommendWrapper>
			<TopBanner></TopBanner>
		</RecommendWrapper>
	);
});

export default Recommend;

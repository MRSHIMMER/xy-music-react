import React, { memo } from "react";
import { getCount, getSizeImage } from "@/utils/format-utils";
import { SongsCoverWrapper } from "./style";

const SongsCover = memo((props) => {
	const { info } = props;
	return (
		<SongsCoverWrapper>
			<div className="cover-top">
				<img src={getSizeImage(info.picUrl, 140)} alt=""></img>
				<div className="cover sprite_cover">
					<div className="info sprite_cover">
						<span>
							<i className="sprite_icon erji"></i>
							{getCount(info.playCount)}
						</span>
						<i className="sprite_icon paly"></i>
					</div>
				</div>
			</div>
			<div className="cover-bottom text-nowrap">{info.name}</div>
			<div className="cover-source text-nowrap">
				by {info.copywriter || info.creator.nickname}
			</div>
		</SongsCoverWrapper>
	);
});

export default SongsCover;

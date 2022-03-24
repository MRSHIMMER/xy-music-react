import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSizeImage } from "@/utils/format-utils";
import { fetchPlayer, selectCurrentSong } from "./playerSlice";
import { Slider } from "antd";
import { PlaybarWrapper, Control, PlayInfo, Operator } from "./style";

const AppPlayerBar = memo(() => {
	const dispatch = useDispatch();
	const currentSong = useSelector(selectCurrentSong);
	const currentSongStatus = useSelector((state) => state.player.status);

	// console.log(currentSong);

	useEffect(() => {
		if (currentSongStatus === "idle") dispatch(fetchPlayer());
	}, [currentSongStatus, dispatch]);

	// 赋值技巧
	const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
	const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";

	return (
		<PlaybarWrapper className="sprite_player">
			<div className="content wrap-v2">
				<Control>
					<button className="sprite_player prev"></button>
					<button className="sprite_player play"></button>
					<button className="sprite_player next"></button>
				</Control>
				<PlayInfo>
					<div className="image">
						<a href="/#">
							<img src={getSizeImage(picUrl, 35)} alt="" />
						</a>
					</div>
					<div className="info">
						<div className="song">
							<span className="song-name">{currentSong.name}</span>
							<a href="/todo" className="singer-name">
								{singerName}
							</a>
						</div>
						<div className="progress">
							<Slider defaultValue={30} />
							<div className="time">
								<span className="now-time">02:30</span>
								<span className="divider"></span>
								<span className="duration">04:22</span>
							</div>
						</div>
					</div>
				</PlayInfo>
				<Operator>
					<div className="left">
						<button className="sprite_player btn favor"></button>
						<button className="sprite_player btn share"></button>
					</div>
					<div className="right sprite_player">
						<button className="sprite_player btn volume"></button>
						<button className="sprite_player btn loop"></button>
						<button className="sprite_player btn playlist"></button>
					</div>
				</Operator>
			</div>
		</PlaybarWrapper>
	);
});

export default AppPlayerBar;

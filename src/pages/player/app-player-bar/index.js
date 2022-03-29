import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import store from "@/store";

import { getSizeImage, formatDate, getPlaySong } from "@/utils/format-utils";
import { fetchSong, selectCurrentSong } from "./playerSlice";

import { Slider } from "antd";
import { NavLink } from "react-router-dom";
import { PlaybarWrapper, Control, PlayInfo, Operator } from "./style";

const AppPlayerBar = memo(() => {
	const [currentTime, setCurrentTime] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isChanging, setIsChanging] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const dispatch = useDispatch();
	const currentSong = useSelector(selectCurrentSong);
	const currentSongStatus = useSelector((state) => state.player.status);

	// console.log(currentSong);
	// const playList = store.getState().player.playList;
	// const songIndex = playList.findIndex((song) => song.id === 1901371647);

	const audioRef = useRef();
	useEffect(() => {
		if (currentSongStatus === "idle") dispatch(fetchSong(1901371647));
	}, [currentSongStatus, dispatch]);
	useEffect(() => {
		audioRef.current.src = getPlaySong(currentSong.id);
	}, [currentSong]);

	// console.log(playList);
	// console.log(songIndex);

	// if (songIndex !== -1) {
	// 	dispatch(changeCurrentSongIndex(10));
	// 	console.log(store.getState().player.currentSongIndex);
	// }

	// 赋值技巧
	const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
	const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";
	const duration = currentSong.dt || 0;
	const showDuration = formatDate(duration, "mm:ss");
	const showCurrentTime = formatDate(currentTime, "mm:ss");

	const playMusic = useCallback(() => {
		isPlaying ? audioRef.current.pause() : audioRef.current.play();
		setIsPlaying(!isPlaying);
	}, [isPlaying]);

	const timeUpdate = (e) => {
		// setCurrentTime(e.target.currentTime * 1000);
		if (!isChanging) {
			setProgress((currentTime / duration) * 100);
			setCurrentTime(e.target.currentTime * 1000);
		}
	};

	//当回调函数传到自定义组件时，使用useCallback优化
	const sliderChange = useCallback(
		(value) => {
			setIsChanging(true);
			const currentTime = (value / 100) * duration;
			setCurrentTime(currentTime);
			setProgress(value);
		},
		[duration]
	);

	const sliderAfterChange = useCallback(
		(value) => {
			const currentTime = ((value / 100) * duration) / 1000;
			audioRef.current.currentTime = currentTime;
			setCurrentTime(currentTime * 1000);
			setIsChanging(false);

			if (!isPlaying) {
				playMusic();
			}
		},
		[duration, isPlaying, playMusic]
	);

	return (
		<PlaybarWrapper className="sprite_player">
			<div className="content wrap-v2">
				<Control isPlaying={isPlaying}>
					<button className="sprite_player prev"></button>
					<button
						className="sprite_player play"
						onClick={(e) => playMusic()}
					></button>
					<button className="sprite_player next"></button>
				</Control>
				<PlayInfo>
					<div className="image">
						<NavLink to="/discover/player">
							<img src={getSizeImage(picUrl, 35)} alt="" />
						</NavLink>
					</div>
					<div className="info">
						<div className="song">
							<span className="song-name">{currentSong.name}</span>
							<a href="/todo" className="singer-name">
								{singerName}
							</a>
						</div>
						<div className="progress">
							<Slider
								defaultValue={30}
								value={progress}
								onChange={sliderChange}
								onAfterChange={sliderAfterChange}
							/>
							<div className="time">
								<span className="now-time">{showCurrentTime}</span>
								<span className="divider"></span>
								<span className="duration">{showDuration}</span>
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
			<audio ref={audioRef} src="" onTimeUpdate={timeUpdate} />
		</PlaybarWrapper>
	);
});

export default AppPlayerBar;

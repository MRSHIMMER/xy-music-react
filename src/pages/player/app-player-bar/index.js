import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSizeImage, formatDate, getPlaySong } from "@/utils/format-utils";
import {
	selectCurrentSong,
	getSongDetailThunk,
	changeSequence,
	changeSongThunk,
} from "./playerSlice";

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
	const sequence = useSelector((state) => state.player.playerSequence);
	// const currentSongStatus = useSelector((state) => state.player.status);

	const audioRef = useRef();

	// 使用createAsyncThunk构造的Thunk函数
	// useEffect(() => {
	// 	if (currentSongStatus === "idle") dispatch(fetchSong(1901371647));
	// }, [currentSongStatus, dispatch]);

	useEffect(() => {
		dispatch(getSongDetailThunk(1901371647));
	}, [dispatch]);
	useEffect(() => {
		audioRef.current.src = getPlaySong(currentSong.id);
		audioRef.current
			.play()
			.then((res) => {
				setIsPlaying(true);
			})
			.catch((err) => {
				setIsPlaying(false);
			});
	}, [currentSong]);

	// 赋值技巧
	// const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
	const picUrl = (currentSong && currentSong.al && currentSong.al.picUrl) || "";
	const singerName =
		(currentSong && currentSong.ar && currentSong.ar[0].name) || "未知歌手";
	const duration = (currentSong && currentSong.dt) || 0;
	const showDuration = formatDate(duration, "mm:ss");
	const showCurrentTime = formatDate(currentTime, "mm:ss");

	const playMusic = useCallback(() => {
		isPlaying ? audioRef.current.pause() : audioRef.current.play();
		setIsPlaying(!isPlaying);
	}, [isPlaying]);

	const changeMusic = (tag) => {
		dispatch(changeSongThunk(tag));
	};

	const timeUpdate = (e) => {
		// setCurrentTime(e.target.currentTime * 1000);
		if (!isChanging) {
			setProgress((currentTime / duration) * 100);
			setCurrentTime(e.target.currentTime * 1000);
		}
	};

	const handleMusicEnded = () => {
		if (sequence === 2) {
			//单曲循环
			audioRef.current.currentTime = 0;
			audioRef.current.play();
		} else {
			dispatch(changeSongThunk(1));
		}
	};

	const changePlayerSequence = () => {
		let currentSequence = (sequence + 1) % 3;
		dispatch(changeSequence(currentSequence));
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
					<button
						className="sprite_player prev"
						onClick={(e) => changeMusic(-1)}
					></button>
					<button
						className="sprite_player play"
						onClick={(e) => playMusic()}
					></button>
					<button
						className="sprite_player next"
						onClick={(e) => changeMusic(1)}
					></button>
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
				<Operator sequence={sequence}>
					<div className="left">
						<button className="sprite_player btn favor"></button>
						<button className="sprite_player btn share"></button>
					</div>
					<div className="right sprite_player">
						<button className="sprite_player btn volume"></button>
						<button
							className="sprite_player btn loop"
							onClick={(e) => changePlayerSequence()}
						></button>
						<button className="sprite_player btn playlist"></button>
					</div>
				</Operator>
			</div>
			<audio
				ref={audioRef}
				src=""
				onTimeUpdate={timeUpdate}
				onEnded={handleMusicEnded}
			/>
		</PlaybarWrapper>
	);
});

export default AppPlayerBar;

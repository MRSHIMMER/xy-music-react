import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import store from "@/store";
import { getSongDetail } from "@/services/player";

const initialState = {
	currentSongIndex: 0,
	currentSong: {},
	playList: [],
	status: "idle",
};

export const fetchSong = createAsyncThunk("player", async (ids) => {
	const dispatch = useDispatch();
	//1、根据ids先查找playlist是否已经有该歌曲
	const playList = store.getState().player.playList;
	const songIndex = playList.findIndex((song) => song.id === ids);

	//2、判断是否在列表中找到歌曲
	if (songIndex !== -1) {
		//找到歌曲
		dispatch(changeCurrentSongIndex(songIndex));
		const song = playList[songIndex];
		return song;
		// dispatch(changeCurrentSong(song));
	} else {
		//未找到歌曲
		//请求歌曲数据
		getSongDetail(ids).then((res) => {
			const song = res.songs && res.songs[0];
			if (!song) return;

			//1、将最新请求到的歌曲添加到播放列表中
			const newPlayList = [...playList, song];
			//2、更新redux中的值
			dispatch(changePlayList(newPlayList));
			dispatch(changeCurrentSongIndex(newPlayList.length - 1));
			return song;
			// dispatch(changeCurrentSong(song));
		});
	}

	// console.log("fetchSong");
	// console.log(playList);
	// const response = await getSongDetail(ids);
	// return response.songs[0];
});

const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		changeCurrentSongIndex(state, action) {
			state.currentSongIndex = action.index;
		},
		changeCurrentSong(state, action) {
			state.currentSong = action.currentSong;
		},
		changePlayList(state, action) {
			state.playList = action.playList;
		},
	},
	extraReducers: {
		[fetchSong.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchSong.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.currentSong = action.payload;
		},
		[fetchSong.rejected]: (state, action) => {
			state.status = "failed";
		},
	},
});

export const { changeCurrentSong, changeCurrentSongIndex, changePlayList } =
	playerSlice.actions;
export default playerSlice.reducer;
export const selectCurrentSong = (state) => state.player.currentSong;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getSongDetail } from "@/services/player";

const initialState = {
	currentSongIndex: 0,
	currentSong: {},
	playList: [],
	status: "idle",
	playerSequence: 0, //0 循环 1 随机 2 单曲循环
};

export const getSongDetailThunk = (ids) => {
	return (dispatch, getState) => {
		// 1.根据id查找playList中是否已经有了该歌曲
		const playList = getState().player.playList;
		const songIndex = playList.findIndex((song) => song.id === ids);

		// 2.判断是否找到歌曲
		let song = null;
		if (songIndex !== -1) {
			// 查找歌曲
			dispatch(changeCurrentSongIndex(songIndex));
			song = playList[songIndex];
			dispatch(changeCurrentSong(song));
		} else {
			// 没有找到歌曲
			// 请求歌曲数据
			getSongDetail(ids).then((res) => {
				song = res.songs && res.songs[0];
				if (!song) return;

				// 1.将最新请求到的歌曲添加到播放列表中
				const newPlayList = [...playList];
				newPlayList.push(song);

				// 2.更新redux中的值
				dispatch(changePlayList(newPlayList));
				dispatch(changeCurrentSongIndex(newPlayList.length - 1));
				dispatch(changeCurrentSong(song));
			});
		}
	};
};

export const fetchSong = createAsyncThunk("player/fetchSong", async (ids) => {
	// 这个payload creator回调函数一定要返回promise，改用普通的thunk
	const response = await getSongDetail(ids);
	return response.songs[0];
});

const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		changeCurrentSongIndex(state, action) {
			state.currentSongIndex = action.payload;
		},
		changeCurrentSong(state, action) {
			state.currentSong = action.payload;
		},
		changePlayList(state, action) {
			state.playList = action.payload;
		},
		changeSequence(state, action) {
			state.playerSequence = action.payload;
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

export const {
	changeCurrentSong,
	changeCurrentSongIndex,
	changePlayList,
	changeSequence,
} = playerSlice.actions;
export default playerSlice.reducer;
export const selectCurrentSong = (state) => state.player.currentSong;

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import Discover from "./pages/discover";
import Friend from "./pages/friend";
import Mine from "./pages/mine";
import Recommend from "./pages/discover/c-pages/recommend";
import Ranking from "./pages/discover/c-pages/ranking";
import Djradio from "./pages/discover/c-pages/djradio";
import Artist from "./pages/discover/c-pages/artist";
import Album from "./pages/discover/c-pages/album";
import Song from "./pages/discover/c-pages/songs";
import Player from "./pages/player";
// import "normalize.css";
import "@/assets/css/reset.css";
// import "antd/dist/antd.css";

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Navigate to="discover" replace={true} />} />
					<Route path="discover" element={<Discover />}>
						<Route index element={<Recommend />} />
						<Route path="ranking" element={<Ranking />} />
						<Route path="djradio" element={<Djradio />} />
						<Route path="artist" element={<Artist />} />
						<Route path="album" element={<Album />} />
						<Route path="songs" element={<Song />} />
						<Route path="player" element={<Player />} />
					</Route>

					<Route path="friend" element={<Friend />} />
					<Route path="mine" element={<Mine />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

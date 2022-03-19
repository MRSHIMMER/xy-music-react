import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Discover from "./pages/discover";
import Friend from "./pages/friend";
import Mine from "./pages/mine";
import Recommend from "./pages/discover/c-pages/recommend";
import Ranking from "./pages/discover/c-pages/ranking";
import Djradio from "./pages/discover/c-pages/djradio";
import Artist from "./pages/discover/c-pages/artist";
import Album from "./pages/discover/c-pages/album";
import Song from "./pages/discover/c-pages/songs";
// import "normalize.css";
import "@/asserts/css/reset.css";
// import "antd/dist/antd.css";

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route path="discover" element={<Discover />}>
					<Route index element={<Recommend />} />
					<Route path="ranking" element={<Ranking />} />
					<Route path="djradio" element={<Djradio />} />
					<Route path="artist" element={<Artist />} />
					<Route path="album" element={<Album />} />
					<Route path="songs" element={<Song />} />
				</Route>

				<Route path="friend" element={<Friend />} />
				<Route path="mine" element={<Mine />} />
			</Route>
		</Routes>
	</BrowserRouter>,
	document.getElementById("root")
);

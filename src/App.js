import React, { memo } from "react";
import { Outlet } from "react-router-dom";

import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import AppPlayerBar from "@/pages/player/app-player-bar";

export default memo(function App() {
	return (
		<div>
			<AppHeader />
			<Outlet />
			<AppFooter />
			<AppPlayerBar />
		</div>
	);
});

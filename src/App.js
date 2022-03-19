import React, { memo } from "react";
import { Outlet } from "react-router-dom";

import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";

export default memo(function App() {
	return (
		<div>
			<AppHeader />
			<Outlet />
			<AppFooter />
		</div>
	);
});

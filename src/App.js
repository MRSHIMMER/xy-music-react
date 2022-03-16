import React, { memo } from "react";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import { useRoutes, Link } from "react-router-dom";

export default memo(function App() {
	let element = useRoutes([
		{
			path: "/test",
			element: <Home />,
		},
	]);
	return (
		<div>
			<AppHeader />
			<h2>App test5</h2>
			<Link to="test">跳转</Link>
			{element}
			<AppFooter />
		</div>
	);
});
function Home() {
	return <div>Home</div>;
}

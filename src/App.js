import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";

import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import Discover from "./pages/discover";
import Friend from "./pages/friend";
import Mine from "./pages/mine";

export default memo(function App() {
  return (
    <div>
      <AppHeader />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/discover" />} /> */}
        <Route path="/" element={<Discover />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/friend" element={<Friend />} />
        <Route path="/mine" element={<Mine />} />
      </Routes>
      <AppFooter />
    </div>
  );
});

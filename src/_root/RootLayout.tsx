import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import TopBar from "@/components/shared/TopBar";
import React from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftSidebar />
      <section className="h-full flex flex-1">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
}

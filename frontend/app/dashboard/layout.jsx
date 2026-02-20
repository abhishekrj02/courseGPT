'use client'
import React, { useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { UserCourseListContext } from "../_context/UserCourseListContext";

function DashboardLayout({ children }) {
  const [userCourseList, setUserCourseList] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
      <div className="min-h-screen w-full relative bg-background">
        <div className="absolute inset-0 z-0 pointer-events-none app-gradient" />
        <div className="relative z-10">
          <SideBar collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
          <div className={`transition-all duration-300 ${collapsed ? "md:ml-16" : "md:ml-64"}`}>
            <Header />
            <div className="p-6 md:p-10">{children}</div>
          </div>
        </div>
      </div>
    </UserCourseListContext.Provider>
  );
}

export default DashboardLayout;

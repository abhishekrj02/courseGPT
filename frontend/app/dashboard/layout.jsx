'use client'
import React, { useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { UserCourseListContext } from "../_context/UserCourseListContext";
import { AppSidebar } from "./_components/DashSideBar";

function DashboardLayout({ children }) {
  const [userCourseList, setUserCourseList] = useState([]);
  return (
    <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>

      <div>
        <div className="min-h-screen w-full relative bg-black">
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
            }}
          />
          {/* Your Content/Components */}
          <div className="">
            <SideBar />
          </div>
          <div className="md:ml-64">
            <Header />
            <div className="p-10">{children}</div>
          </div>
        </div>

      </div>
    </UserCourseListContext.Provider>
  );
}

export default DashboardLayout;

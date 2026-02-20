"use client"
import React, { useState } from "react";
import Header from "../dashboard/_components/Header";
import { UserInputContext } from "../_context/UserInputContext";

function CreateCourseLayout({ children }) {
  const [userCourseInput, setUserCourseInput] = useState([]);
  return (
    <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
      <div className="min-h-screen w-full relative bg-background">
        <div className="absolute inset-0 z-0 pointer-events-none app-gradient" />
        <div className="relative z-10">
          <Header />
          {children}
        </div>
      </div>
    </UserInputContext.Provider>
  );
}

export default CreateCourseLayout;

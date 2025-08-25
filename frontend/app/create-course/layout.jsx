"use client"
import React, { useState } from "react";
import Header from "../dashboard/_components/Header";
import { UserInputContext } from "../_context/UserInputContext";

function CreateCourseLayout({ children }) {
  const [userCourseInput, setUserCourseInput] = useState([]);
  return (
    <div>
      <div className="min-h-screen w-full relative bg-black">
        {/* X Organizations Black Background with Top Glow */} {" "}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
          }}
        />
        {/* Your Content/Components */}
        <div className="relative z-10">
          <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
            <Header />
            {children}
          </UserInputContext.Provider>
        </div>
      </div>

    </div>
  );
}

export default CreateCourseLayout;

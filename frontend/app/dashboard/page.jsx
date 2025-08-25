import React from "react";
import AddCourse from "./_components/AddCourse";
import UserCourseList from "./_components/UserCourseList";

function Dashboard() {
  return (
    <>
      <div className="relative z-10">
        <AddCourse />
        <UserCourseList />
      </div>
    </>
  );
}

export default Dashboard;

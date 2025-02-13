import { Progress } from "@/components/ui/progress";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddCourse from "./_components/AddCourse";
import UserCourseList from "./_components/UserCourseList";

function Dashboard() {
  return (
    <>
      <AddCourse />
      <UserCourseList />
    </>
  );
}

export default Dashboard;

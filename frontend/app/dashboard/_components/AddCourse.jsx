"use client";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useContext } from "react";

function AddCourse() {
  const { user } = useUser();
  const {userCourseList, setUserCourseList} = useContext(UserCourseListContext);
  return (
    <div className="sm:flex items-center justify-between">
      <div>
        <h2 className="text-2xl">
          Hello, <span className="font-bold">{user?.fullName}</span>
        </h2>
        <p className="text-sm text-gray-500">
          Create new courses with AI, Share with friends and Earn from it.
        </p>
      </div>
      <div className="my-2">
        <Link href={(userCourseList?.length)>=15?"/dashbord/upgrade":"/create-course"}>
          <Button>Create AI Course</Button>
        </Link>
        {(userCourseList?.length)>=15 && <p className="text-xs text-red-600 text-left md:text-center">*Maximum Limit Reached</p>}
      </div>
    </div>
  );
}

export default AddCourse;

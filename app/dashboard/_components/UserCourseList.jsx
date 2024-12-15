"use client";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import Image from "next/image";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const {userCourseList, setUserCourseList} = useContext(UserCourseListContext);
  const { user } = useUser();

  useEffect(() => {
    user && getUserCourses();
  }, [user]);


  const getUserCourses = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.createdBy, user.primaryEmailAddress.emailAddress));
    // console.log(result);
    setCourseList(result);
    setUserCourseList(result);
  };

  return (
    <div className="mt-8">
      <h2 className="font-medium text-xl">My AI Courses</h2>
      {courseList?.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courseList.map((course, index) => (
            <CourseCard refreshData={()=> getUserCourses()} course={course} key={index} />
          ))}
        </div>
      ) : (
        <div className="h-[200px] w-full flex items-center justify-center">
          <Image src={"/loading2.gif"} width={50} height={50} alt="loading" />
        </div>
      )}
    </div>
  );
}

export default UserCourseList;

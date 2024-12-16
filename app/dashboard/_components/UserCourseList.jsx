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
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && getUserCourses();
  }, [user]);


  const getUserCourses = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.createdBy, user.primaryEmailAddress.emailAddress));
    // console.log(result);
    setCourseList(result);
    setUserCourseList(result);
    setLoading(false);
  };

  return (
    <div className="mt-8">
      <h2 className="font-medium text-xl mb-4">Explore More Courses</h2>
      {loading ? (
        // Show loading spinner when fetching data
        <div className="h-[200px] w-full flex items-center justify-center">
          <Image src={"/loading2.gif"} width={50} height={50} alt="loading" />
        </div>
      ) : courseList?.length > 0 ? (
        // Show courses when data is available
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courseList.map((course, index) => (
            <CourseCard
              refreshData={() => getUserCourses()}
              viewOnly={false}
              course={course}
              key={index}
            />
          ))}
        </div>
      ) : (
        // Show "no courses" message if array is empty
        <div className="h-[200px] w-full flex items-center justify-center">
          <p>No courses to show</p>
        </div>
      )}
    </div>
  );
}

export default UserCourseList;

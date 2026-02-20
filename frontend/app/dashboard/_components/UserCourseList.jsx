"use client";
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import axios from "axios";
import { BookOpen } from "lucide-react";

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const { setUserCourseList } = useContext(UserCourseListContext);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) getUserCourses();
  }, [user]);

  const getUserCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/courses/user",
        { params: { email: user?.primaryEmailAddress?.emailAddress } }
      );
      if (response.status === 200) {
        setCourseList(response.data);
        setUserCourseList(response.data);
      }
    } catch (error) {
      console.error("Error fetching user courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <BookOpen className="h-4 w-4 text-blue-500" />
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">My Courses</h2>
      </div>

      {loading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="loader" />
        </div>
      ) : courseList.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courseList.map((course, index) => (
            <CourseCard key={index} course={course} viewOnly={false} refreshData={getUserCourses} />
          ))}
        </div>
      ) : (
        <div className="h-48 flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card">
          <BookOpen className="h-8 w-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No courses yet — create your first one!</p>
        </div>
      )}
    </div>
  );
}

export default UserCourseList;

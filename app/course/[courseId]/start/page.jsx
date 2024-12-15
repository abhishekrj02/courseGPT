"use client";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_component/ChapterListCard";

function StartCourse({ params }) {
  const [course, setCourse] = useState();
  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));
    setCourse(result[0]);
  };

  return (
    <div>
      {/* chapter list sidebar */}
      <div className="md:w-72 hidden md:block h-screen bg-blue-50 shadow-md">
        <h2 className="font-medium text-lg p-3 text-white bg-primary">
          {course?.courseOutput?.CourseName}
        </h2>
        <div>
          {course?.courseOutput?.Chapters.map((chapter, index) => (
            <div key={index} className="cursor-pointer hover:bg-blue-100">
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* content */}
      <div className="md:ml-64"></div>
    </div>
  );
}

export default StartCourse;

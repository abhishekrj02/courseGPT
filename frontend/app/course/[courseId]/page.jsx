"use client";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetail from "@/app/create-course/[courseId]/_components/CourseDetail";
import Header from "@/app/dashboard/_components/Header";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";


function Course() {
  const [course, setCourse] = useState();
  const params = useParams();
  useEffect(() => {
    params && GetCourse();
  }, [params]);


  const GetCourse = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/api/courses/course/all', {
        params: {
          courseId: params?.courseId,
        }
      });

      if (response.status === 200) {
        setCourse(response.data);
      } else {
        console.error("Course not found:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch course:", error);
    }
  };
  return (
    <div className="min-h-screen w-full relative bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
        }}
      />
      <Header />
      <div className="relative z-10">
        <div className="my-10 px-7 md:px-20 lg-px-44">
          {/* <LoadingDialog loading={loading} /> */}
          <CourseBasicInfo course={course} />
          <CourseDetail course={course} />
          <ChapterList course={course} />
        </div>
      </div>
    </div>



  );
}

export default Course;

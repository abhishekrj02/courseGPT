"use client";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { CopyCheckIcon } from "lucide-react";
import axios from "axios";

function FinishScreen() {
  const { user } = useUser();
  const router = useRouter();
  const [course, setCourse] = useState();
  const params = useParams();
  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourseOld = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList?.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setCourse(result[0]);
  };
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_HOSTNAME + "course/" + course?.courseId + "/start"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset message after 2 seconds
  };
  const GetCourse = async () => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/api/courses/course', {
            params: {
                courseId: params?.courseId,
                createdBy: user?.primaryEmailAddress?.emailAddress
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
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="text-center text-2xl pb-4 text-primary text-bold">
        Congrats! Your course is ready.
      </h2>
      <CourseBasicInfo course={course} refreshData={() => console.log()} />
      <h2 className="mt-3">Course URL:</h2>
      <h2 className="flex gap-5 text-center text-sm text-gray-500 p-2 border rounded-xl">
        {process.env.NEXT_PUBLIC_HOSTNAME}course/{course?.courseId}/start
        <CopyCheckIcon
          className="h-5 w-5 cursor-pointer"
          onClick={handleCopy}
        />
      </h2>
      {copied && (
        <p className="text-center text-green-500 text-lg mt-1">
          Copied!
        </p>
      )}
    </div>
  );
}

export default FinishScreen;

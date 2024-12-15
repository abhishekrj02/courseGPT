"use client";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { CopyCheckIcon } from "lucide-react";

function FinishScreen({ params }) {
  const { user } = useUser();
  const router = useRouter();
  const [course, setCourse] = useState();
  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
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
      process.env.NEXT_PUBLIC_HOSTNAME + "course/view/" + course?.courseId
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset message after 2 seconds
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="text-center text-2xl pb-4 text-primary text-bold">
        Congrats! Your course is ready.
      </h2>
      <CourseBasicInfo course={course} refreshData={() => console.log()} />
      <h2 className="mt-3">Course URL:</h2>
      <h2 className="flex gap-5 text-center text-sm text-gray-500 p-2 border rounded-xl">
        {process.env.NEXT_PUBLIC_HOSTNAME}course/view/{course?.courseId}
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

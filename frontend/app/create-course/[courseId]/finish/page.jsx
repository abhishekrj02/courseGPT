"use client";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { Check, Copy, PartyPopper } from "lucide-react";
import axios from "axios";

function FinishScreen() {
  const { user } = useUser();
  const params = useParams();
  const [course, setCourse] = useState();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (params && user) GetCourse();
  }, [params, user]);

  const courseUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}course/${course?.courseId}/start`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(courseUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const GetCourse = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/api/courses/course", {
        params: {
          courseId: params?.courseId,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        },
      });
      if (response.status === 200) setCourse(response.data);
    } catch (error) {
      console.error("Failed to fetch course:", error);
    }
  };

  return (
    <div className="px-6 md:px-20 lg:px-44 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
          <PartyPopper className="h-6 w-6 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Your course is ready!</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Share the link below with anyone to start learning.
        </p>
      </div>

      <CourseBasicInfo course={course} edit={false} />

      <div className="mt-5">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Course URL</p>
        <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
          <span className="flex-1 text-sm text-muted-foreground truncate">{courseUrl}</span>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors"
          >
            {copied ? (
              <><Check className="h-4 w-4 text-green-500" /><span className="text-green-500">Copied!</span></>
            ) : (
              <><Copy className="h-4 w-4" />Copy</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinishScreen;

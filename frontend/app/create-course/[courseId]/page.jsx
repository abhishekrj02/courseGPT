"use client";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/config/AiModel";
import serivce from "@/config/serivce";
import { BookOpen, CheckCircle2, Loader2, Sparkles } from "lucide-react";

function CourseLayout() {
  const { user } = useUser();
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, label: "" });

  useEffect(() => {
    if (params && user) GetCourse();
  }, [params, user]);

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

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.Chapters ?? [];
    setProgress({ current: 0, total: chapters.length, label: "Starting..." });

    try {
      for (let index = 0; index < chapters.length; index++) {
        const chapter = chapters[index];
        setProgress({ current: index + 1, total: chapters.length, label: chapter.chapterName });

        const PROMPT = `Provide detailed explanations for the chapter: ${chapter.chapterName} from the course: ${course.courseOutput.CourseName}. The chapter description is: ${chapter.description}, with a duration of ${chapter.duration}. Structure the response in JSON format with fields: title, explanation, code (if needed), additionalResources (optional). Ensure each section is clear and detailed.`;

        try {
          const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
          const content = JSON.parse(result?.response?.text());

          let videoId = "";
          await serivce.getVideos(course?.name + ":" + chapter?.chapterName).then((resp) => {
            videoId = resp[0]?.id?.videoId ?? "";
          });

          await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "/api/chapters", {
            chapterId: index,
            courseId: course?.courseId,
            content,
            videoId,
          });

          await delay(400);
        } catch (err) {
          console.error(`Error on chapter: ${chapter.chapterName}`, err);
        }
      }
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      try {
        await axios.put(process.env.NEXT_PUBLIC_SERVER_URL + "/api/courses/publish", {
          courseId: course?.courseId,
        });
      } catch (e) {
        console.error("Publish error:", e);
      }
      setLoading(false);
      router.replace(`/create-course/${course?.courseId}/finish`);
    }
  };

  return (
    <div className="px-6 md:px-20 pb-16 pt-6">
      {/* Page title */}
      {!course?.publish && (
        <div className="mb-6">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Step 4</p>
          <h2 className="text-2xl font-bold text-foreground">Review Your Course</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Check everything looks right, then generate the full course content.
          </p>
        </div>
      )}

      {course?.publish && (
        <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
          <p className="text-sm text-green-600 dark:text-green-400">
            Course already generated and published.
          </p>
        </div>
      )}

      <CourseBasicInfo course={course} refreshData={GetCourse} edit={!course?.publish} />
      <CourseDetail course={course} />
      <ChapterList course={course} />

      {/* Generate CTA */}
      {!course?.publish && (
        <div className="mt-8 p-6 rounded-2xl border border-border bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                Generate Full Course Content
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                AI will write detailed explanations, code examples, and find videos for each chapter.
              </p>
            </div>
            <Button
              onClick={GenerateChapterContent}
              disabled={loading}
              className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Generating...</>
              ) : (
                "Generate Content"
              )}
            </Button>
          </div>

          {/* Progress bar */}
          {loading && progress.total > 0 && (
            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  {progress.label}
                </span>
                <span>{progress.current} / {progress.total}</span>
              </div>
              <div className="h-1.5 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CourseLayout;

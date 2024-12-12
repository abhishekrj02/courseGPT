"use client";
import { useRouter } from "next/navigation";
import { db } from "@/config/db";
import { Chapters, CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/config/AiModel";
import LoadingDialog from "../_component/LoadingDialog";
import serivce from "@/config/serivce";

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
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
  const router = useRouter();
  const GenerateChapterContent = () => {
    setLoading(true);
    const chapters = course?.courseOutput?.Chapters;
    chapters.forEach(async (chapter, index) => {
      const PROMPT = `Explain the concept in detail on courseName: ${course.courseOutput.CourseName}, chapterName: ${chapter.chapterName} chapter description is ${chapter.description} duration: ${chapter.duration} , in JSON format with list of array with field as title, explanation on given chapter in full details (use point wise explanation if needed), code example(Code field in <precode> format) if applicable.`;

      const PROMPT2 = `Provide detailed explanations for the chapter: ${chapter.chapterName} from the course: ${course.courseOutput.CourseName}. The chapter description is: ${chapter.description}, with a duration of ${chapter.duration}. Structure the response in JSON format with the following fields:
    
    - \`title\`: Title of the section or concept covered in the chapter.
    - \`explanation\`: A detailed explanation of the concept, including key points and examples if applicable.
    - \`code\` (if needed): Relevant code snippets or examples in <precode> format.
    - \`additionalResources\` (optional): Any additional resources such as links, books, or articles for further reading.
    
    Ensure each section is clear, detailed, and organized. Use point-wise explanations if necessary, and include code examples when applicable.`;

      // console.log(PROMPT2);
      try {
        let videoId = "";
        serivce
          .getVideos(course?.name + ":" + chapter?.chapterName)
          .then((resp) => {
            // console.log(resp);
            videoId = resp[0]?.id?.videoId;
          });
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT2);
        // console.log(result?.response?.text());

        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: JSON.parse(result?.response?.text()),
          videoId: videoId,
        });

        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
      router.replace("/create-course/" + course?.courseId + "/finish");
    });
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg-px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>
      <LoadingDialog loading={loading} />
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
      <CourseDetail course={course} />
      <ChapterList course={course} refreshData={() => GetCourse()} />
      <Button className="mb-8 mt-4" onClick={GenerateChapterContent}>
        Generate Course Content
      </Button>
    </div>
  );
}

export default CourseLayout;

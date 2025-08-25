"use client";
import { useParams, useRouter } from "next/navigation";
import axios from 'axios';
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/config/AiModel";
import LoadingDialog from "../_component/LoadingDialog";
import serivce from "@/config/serivce";

function CourseLayout() {
  const { user } = useUser();
  const params = useParams();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

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

  const router = useRouter();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  const GenerateChapterContent = async () => {
    setLoading(true);

    try {
      const chapters = course?.courseOutput?.Chapters || [];
      const chapterPromises = chapters.map(async (chapter, index) => {
        const PROMPT2 = `Provide detailed explanations for the chapter: ${chapter.chapterName} from the course: ${course.courseOutput.CourseName}. The chapter description is: ${chapter.description}, with a duration of ${chapter.duration}. Structure the response in JSON format with the following fields: - \`title\`: Title of the section or concept covered in the chapter. - \`explanation\`: A detailed explanation of the concept, including key points and examples if applicable. - \`code\` (if needed): Relevant code snippets or examples in <precode> format. - \`additionalResources\` (optional): Any additional resources such as links, books, or articles for further reading. Ensure each section is clear, detailed, and organized. Use point-wise explanations if necessary, and include code examples (but remove opening and closing precode tags) when applicable.`;

        try {
          // Generate AI-generated chapter content
          const result = await GenerateChapterContent_AI.sendMessage(PROMPT2);
          const content = JSON.parse(result?.response?.text());

          // Fetch video ID (if applicable)
          let videoId = "";
          await serivce
            .getVideos(course?.name + ":" + chapter?.chapterName)
            .then((resp) => {
              videoId = resp[0]?.id?.videoId;
            });

          // Insert into database using Axios
          await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + '/api/chapters', {
            chapterId: index,
            courseId: course?.courseId,
            content: content,
            videoId: videoId
          });

          await delay(500); // Small delay to reduce server load

        } catch (error) {
          console.error(`Error processing chapter: ${chapter.chapterName}`, error);
        }
      });

      await Promise.all(chapterPromises); // Wait for all chapters to process
    } catch (error) {
      console.error("Error generating chapter content:", error);
    } finally {
      // Update course as published
      try {
        await axios.put(process.env.NEXT_PUBLIC_SERVER_URL + '/api/courses/publish', { courseId: course?.courseId });
      } catch (error) {
        console.error("Error updating course status:", error);
      }

      setLoading(false);
      router.replace(`/create-course/${course?.courseId}/finish`);
    }
  };


  return (
    <div className="mt-10 px-7 md:px-20 lg-px-44">
      {!course?.publish && <h2 className="font-bold text-center text-2xl">Course Layout</h2>}
      <LoadingDialog loading={loading} />
      <CourseBasicInfo course={course} refreshData={() => GetCourse()}/>
      <CourseDetail course={course} />
      <ChapterList course={course} refreshData={() => GetCourse()} edit={!course?.publish} />
      {course?.publish && <p className="text-right text-gray-600 text-xs">*Course already generated</p>}
      <Button className="mb-8 mt-4" onClick={GenerateChapterContent} disabled={course?.publish}>
        Generate Course Content
      </Button>

    </div>
  );
}

export default CourseLayout;

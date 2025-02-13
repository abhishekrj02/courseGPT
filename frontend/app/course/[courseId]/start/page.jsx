"use client";
import { db } from "@/config/db";
import { Chapters, CourseList } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useRef, useState } from "react";
import ChapterListCard from "./_component/ChapterListCard";
import ChapterContent from "./_component/ChapterContent";
import Header from "@/app/dashboard/_components/Header";
import axios from 'axios';
import { useParams } from "next/navigation";

function StartCourse() {
  const params = useParams();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChaptercontent] = useState();
  const [course, setCourse] = useState();
  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourseOld = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));
    setCourse(result[0]);
    setSelectedChapter(result[0].courseOutput?.Chapters[0])
    getSelectedChapterContent(0);
  };


const GetCourse = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/courses/course/all', {
            params: { courseId: params?.courseId }
        });

        if (response.status === 200) {
            const courseData = response.data;
            setCourse(courseData);
            setSelectedChapter(courseData.courseOutput?.Chapters[0]);
            getSelectedChapterContent(0, params);
        } else {
            console.error("Course not found:", response.data);
        }
    } catch (error) {
        console.error("Failed to fetch course:", error);
    }
};
  const getSelectedChapterContentOld = async (index) => {
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters.courseId, params?.courseId),
          eq(Chapters.chapterId, index)
        )
      );
    // console.log(result);
    setChaptercontent(result[0]);
    // console.log(chapterContent);
  };
  const getSelectedChapterContent = async (index) => {
    try {
        const response = await axios.get('http://localhost:5000/api/chapters', {
            params: {
                courseId: params?.courseId,
                chapterId: index
            }
        });

        if (response.status === 200) {
          setChaptercontent(response.data);
        } else {
            console.error("Chapter not found:", response.data);
        }
    } catch (error) {
        console.error("Failed to fetch chapter:", error);
    }
};

  const scrollableDivRef = useRef(null);

  const handleScrollToTop = () => {
    window.scrollTo({top: 0, behavior:"smooth"});
  };



  return (
    <div>
      {/* chapter list sidebar */}
      <div className="fixed md:w-72 hidden md:block h-screen bg-blue-50 shadow-md overflow-y-scroll">
        <h2 className="font-medium text-lg p-3 text-white bg-primary">
          {course?.courseOutput?.CourseName}
        </h2>
        <div>
          {course?.courseOutput?.Chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-blue-100 transition-all duration-200 ${selectedChapter == chapter ? "bg-blue-100" : ""
                }`}
              onClick={() => {

                
                handleScrollToTop();
                setSelectedChapter(chapter);
                getSelectedChapterContent(index);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* content */}
      <div className="md:ml-72" ref={scrollableDivRef}>
        <Header />
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}

export default StartCourse;

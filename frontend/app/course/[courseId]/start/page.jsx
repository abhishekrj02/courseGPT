"use client";
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

  const GetCourse = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/api/courses/course/all', {
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

  const getSelectedChapterContent = async (index) => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/api/chapters', {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div className="relative z-10">
        <div>
          {/* chapter list sidebar */}
          <div className="fixed md:w-72 hidden md:block h-screen bg-black/40 shadow-md overflow-y-scroll custom-scrollbar">
            <h2 className="font-medium text-lg p-3 text-white bg-primary/50">
              {course?.courseOutput?.CourseName}
            </h2>
            <div>
              {course?.courseOutput?.Chapters.map((chapter, index) => (
                <div
                  key={index}
                  className={`cursor-pointer hover:bg-primary/10 transition-all duration-200 ${selectedChapter == chapter ? "bg-primary/10" : ""
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
      </div>
    </div>
  );
}

export default StartCourse;

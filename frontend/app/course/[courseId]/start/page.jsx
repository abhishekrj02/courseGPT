"use client";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_component/ChapterListCard";
import ChapterContent from "./_component/ChapterContent";
import Header from "@/app/dashboard/_components/Header";
import axios from "axios";
import { useParams } from "next/navigation";
import ChatBox from "./_component/ChatBox";
import { BookOpen, ChevronDown, X } from "lucide-react";

function StartCourse() {
  const params = useParams();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [chapterContent, setChaptercontent] = useState(null);
  const [course, setCourse] = useState(null);
  const [mobileChaptersOpen, setMobileChaptersOpen] = useState(false);

  useEffect(() => { GetCourse(); }, []);

  const GetCourse = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/courses/course/all",
        { params: { courseId: params?.courseId } }
      );
      if (response.status === 200) {
        const data = response.data;
        setCourse(data);
        setSelectedChapter(data.courseOutput?.Chapters[0]);
        getSelectedChapterContent(0);
      }
    } catch (error) {
      console.error("Failed to fetch course:", error);
    }
  };

  const getSelectedChapterContent = async (index) => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/chapters",
        { params: { courseId: params?.courseId, chapterId: index } }
      );
      if (response.status === 200) setChaptercontent(response.data);
    } catch (error) {
      console.error("Failed to fetch chapter:", error);
    }
  };

  const handleSelectChapter = (chapter, index) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedChapter(chapter);
    setSelectedIndex(index);
    getSelectedChapterContent(index);
    setMobileChaptersOpen(false);
  };

  return (
    <div className="min-h-screen w-full relative bg-background">
      <div className="absolute inset-0 z-0 pointer-events-none app-gradient" />
      <div className="relative z-10">

        {/* Desktop chapter sidebar */}
        <div className="fixed md:w-72 hidden md:flex flex-col h-screen bg-background/90 dark:bg-black/50 backdrop-blur-xl border-r border-border z-40">
          <div className="p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="h-4 w-4 text-blue-500 flex-shrink-0" />
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Course</h2>
            </div>
            <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
              {course?.courseOutput?.CourseName ?? "Loading..."}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {course?.courseOutput?.Chapters.map((chapter, index) => (
              <div key={index} className="cursor-pointer" onClick={() => handleSelectChapter(chapter, index)}>
                <ChapterListCard chapter={chapter} index={index} active={selectedIndex === index} />
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="md:ml-72">
          <Header />

          {/* Mobile: chapter picker bar */}
          <div className="md:hidden sticky top-[57px] z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-2.5">
            <button
              onClick={() => setMobileChaptersOpen(true)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
            >
              <BookOpen className="h-4 w-4 text-blue-500 flex-shrink-0" />
              <span className="truncate font-medium text-foreground">{selectedChapter?.chapterName ?? "Select chapter"}</span>
              <ChevronDown className="h-4 w-4 ml-auto flex-shrink-0" />
            </button>
          </div>

          <ChapterContent chapter={selectedChapter} content={chapterContent} />
        </div>

        {/* Mobile chapter drawer */}
        {mobileChaptersOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileChaptersOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-2xl max-h-[70vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
                <h2 className="font-semibold text-foreground text-sm">Chapters</h2>
                <button onClick={() => setMobileChaptersOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="overflow-y-auto custom-scrollbar">
                {course?.courseOutput?.Chapters.map((chapter, index) => (
                  <div key={index} className="cursor-pointer" onClick={() => handleSelectChapter(chapter, index)}>
                    <ChapterListCard chapter={chapter} index={index} active={selectedIndex === index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <ChatBox course={course} />
      </div>
    </div>
  );
}

export default StartCourse;

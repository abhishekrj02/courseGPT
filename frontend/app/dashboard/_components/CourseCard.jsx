import { BookOpen, EllipsisVertical, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import courseBanner from "@/public/banner2.jpg";

const DIFFICULTY_COLORS = {
  Beginner:     "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
  Advanced:     "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
};

function CourseCard({ course, refreshData, viewOnly }) {
  const difficulty = course?.courseOutput?.difficulty ?? course?.difficulty;
  const difficultyClass = DIFFICULTY_COLORS[difficulty] ?? "bg-muted text-muted-foreground border-border";
  const banner = course?.courseBanner && course.courseBanner !== "" ? course.courseBanner : null;

  const deleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(process.env.NEXT_PUBLIC_SERVER_URL + `/api/courses/${courseId}`);
      if (response.status === 200) refreshData();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="group rounded-xl border border-border bg-card hover:shadow-md dark:hover:border-white/20 transition-all duration-300 overflow-hidden">
      <Link href={`/course/${course?.courseId}`}>
        <div className="relative overflow-hidden">
          <Image
            src={banner ?? courseBanner}
            unoptimized={!!banner}
            width={400}
            height={200}
            alt="Course banner"
            className="w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full border ${difficultyClass}`}>
            {difficulty}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start gap-2">
          <Link href={`/course/${course?.courseId}`} className="flex-1 min-w-0">
            <h2 className="font-semibold text-sm text-foreground leading-snug line-clamp-2 hover:text-blue-500 transition-colors">
              {course?.courseOutput?.CourseName}
            </h2>
          </Link>
          {!viewOnly && (
            <Dropdown handleOnDelete={() => deleteCourse(course?.courseId)} refreshData={refreshData}>
              <EllipsisVertical className="h-4 w-4 text-muted-foreground flex-shrink-0 hover:text-foreground transition-colors" />
            </Dropdown>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-1">{course?.category}</p>

        <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
          <Layers className="h-3.5 w-3.5" />
          <span>{course?.courseOutput?.noOfChapters} chapters</span>
        </div>

        {viewOnly && course?.userProfileImage && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
            <Image alt="Author" src={course.userProfileImage} height={20} width={20} className="rounded-full" />
            <span className="text-xs text-muted-foreground truncate">{course?.username}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;

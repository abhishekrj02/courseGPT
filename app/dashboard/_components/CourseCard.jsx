import Image from "next/image";
import Link from "next/link";
import React from "react";

function CourseCard({ course }) {
  
  return (
    
    <Link href={`create-course/${course?.courseId}`}>
    <div className="shadow-lg rounded-lg">
      <Image
        src={course?.courseBanner}
        width={300}
        height={200}
        alt="banner"
        className="w-full h-[200px] object-cover rounded-t-lg"
      />
      <div className="py-2 px-1">
        <h2 className="font-medium text-lg md:overflow-hidden md:whitespace-nowrap md:text-ellipsis">
          {course?.courseOutput?.CourseName}
        </h2>
        <h2 className="text-gray-400 text-sm">{course?.category}</h2>
        <div className="flex justify-between">
          <h2>{course?.courseOutput?.noOfChapters} Chapters</h2>
          <h2>{course?.courseOutput?.difficulty}</h2>

        </div>
      </div>
    </div>
    </Link>
  );
}

export default CourseCard;

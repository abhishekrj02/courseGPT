import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Dropdown from "./Dropdown";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";

function CourseCard({ course, refreshData, viewOnly }) {
  const deleteCourse = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList?.id });

    if (resp) {
      refreshData();
    }
  };
  return (
    <div className="hover:shadow-xl shadow-lg border rounded-lg transition-all duration-200 ">
      <Link href={`/course/${course?.courseId}`}>
        <Image
          src={course?.courseBanner}
          width={300}
          height={200}
          alt="banner"
          className="w-full h-[200px] object-cover rounded-t-lg"
        />
      </Link>
      <div className="py-2 px-3">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-lg md:overflow-hidden md:whitespace-nowrap md:text-ellipsis">
            {course?.courseOutput?.CourseName}
          </h2>
          {!viewOnly &&
            <Dropdown handleOnDelete={() => deleteCourse()} refreshData={() => refreshData()}>
              <EllipsisVertical />
            </Dropdown>}
        </div>
        <h2 className="text-gray-400 text-sm">{course?.category}</h2>
        <div className="flex justify-between">
          <h2>{course?.courseOutput?.noOfChapters} Chapters</h2>
          <h2>{course?.courseOutput?.difficulty}</h2>
        </div>
        {viewOnly && <div className="flex  text-gray-600 text-sm gap-2 items-center mt-2">
          {/* <h2>Published By: </h2> */}
          <Image src={course?.userProfileImage} height={20} width={20} className="rounded-full" />
          <h2>{course?.username}</h2>

        </div>
        }
      </div>
    </div>
  );
}

export default CourseCard;

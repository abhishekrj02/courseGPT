import { Button } from "@/components/ui/button";
import { PuzzleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";


function CourseBasicInfo({ course, refreshData }) {


  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="my-auto">
          <h2 className="font-bold text-xl md:text-3xl">
            {course?.courseOutput?.CourseName}{" "}
          </h2>
          <p className="text-sm text-gray-400 mt-3 text-justify">
            {course?.courseOutput?.Description}
          </p>

          <h2 className="font-medium mt-4 flex gap-2 items-center text-primary">
            <PuzzleIcon />
            {course?.category}
          </h2>

          <Link href={"/course/" + course?.courseId + "/start"}>
            <Button className="w-full mt-4">Start</Button>
          </Link>


        </div>

        <div className="h-full">
          <label
            htmlFor="upload-image"
          >
            <div>
              <Image
                alt="Upload Logo"
                src={"/defaultBanner.jpg"}
                width={400}
                height={400}
                className="w-full rounded-xl  object-cover bg-gray-400"
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;

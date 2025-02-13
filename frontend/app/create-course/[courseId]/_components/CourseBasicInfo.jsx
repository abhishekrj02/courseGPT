import { Button } from "@/components/ui/button";
import { PuzzleIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/FirebaseConfig";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseBasicInfo({ course, refreshData, edit }) {
  const [selectedFile, setSelectedFile] = useState();
  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    const fileName = Date.now() + ".jpg";
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        // console.log("Upload file Complete");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          // console.log(downloadUrl);
          await db
            .update(CourseList)
            .set({
              courseBanner: downloadUrl,
            })
            .where(eq(CourseList.courseId, course?.courseId));
        });
      });
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="my-auto">
          <h2 className="font-bold text-xl md:text-3xl">
            {course?.courseOutput?.CourseName}{" "}
            {edit && (
              <EditCourseBasicInfo
                course={course}
                refreshData={() => refreshData(true)}
              />
            )}
          </h2>
          <p className="text-sm text-gray-400 mt-3 text-justify">
            {course?.courseOutput?.Description}
          </p>

          <h2 className="font-medium mt-4 flex gap-2 items-center text-primary">
            <PuzzleIcon />
            {course?.category}
          </h2>
          {!edit && (
            <Link href={"/course/" + course?.courseId + "/start"}>
              <Button className="w-full mt-4">Start</Button>
            </Link>
          )}
        </div>

        <div className="h-full">
          <label
            htmlFor="upload-image"
            className={edit ? "cursor-pointer" : "cursor-default"}
          >
            <div>
              <Image
                alt="Upload Logo"
                src={selectedFile ? selectedFile : "/defaultBanner.jpg"}
                width={400}
                height={400}
                className="w-full rounded-xl  object-cover bg-gray-400"
              />
            </div>
          </label>
          {edit && (
            <input
              type="file"
              id="upload-image"
              className="hidden"
              onChange={onFileSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;

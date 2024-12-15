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
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState("/defaultBanner.jpg");
  useEffect(() => {
    if (course?.courseBanner) {
      setFilePreview(course?.courseBanner);
    } else {
      console.log("everything ok till here");
    }
  }, [course]);

  const onFileSelected = async (event) => {
    const file = event.target.files[0]; // Get the first selected file
    console.log(file);
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file)); // Create a preview URL
    }
    const fileName = Date.now() + ".jpg";
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Upload file compplete..");
      })
      .then((resp) => getDownloadURL(storageRef))
      .then(async (downloadURL) => {
        console.log(downloadURL);
        await db
          .update(CourseList)
          .set({
            courseBanner: downloadURL,
          })
          .where(eq(CourseList.id, course?.id));
      });
  };

  // const [selectedFile, setSelectedFile] = useState(null);
  // const [filePreview, setFilePreview] = useState('/defaultBanner.jpg');

  // useEffect(() => {
  //     // Update preview when course data changes
  //     if (course?.courseBanner) {
  //         setFilePreview(course.courseBanner);
  //     }
  // }, [course]);

  // const onFileSelected = async (event) => {
  //     const file = event.target.files[0];
  //     if (!file) return;

  //     // Set the preview immediately for user feedback
  //     const previewURL = URL.createObjectURL(file);
  //     setFilePreview(previewURL);
  //     setSelectedFile(file);

  //     try {
  //         const fileName = `${Date.now()}.jpg`;
  //         const storageRef = ref(storage, fileName);

  //         // Upload file to Firebase Storage
  //         const snapshot = await uploadBytes(storageRef, file);
  //         console.log("File uploaded successfully", snapshot);

  //         // Get the file's download URL
  //         const downloadURL = await getDownloadURL(storageRef);
  //         console.log("Download URL:", downloadURL);

  //         // Update the database with the new URL
  //         await db
  //             .update(CourseList)
  //             .set({ courseBanner: downloadURL })
  //             .where(eq(CourseList.id, course?.id));

  //         // Refresh course data
  //         refreshData(true);
  //     } catch (error) {
  //         console.error("Error uploading file:", error);
  //     } finally {
  //         // Clean up preview URL to prevent memory leaks
  //         URL.revokeObjectURL(previewURL);
  //     }
  // };

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
                src={filePreview}
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
/*
courseOutput
    CourseName
    Description
    Duration
    NoOfChapters
*/

export default CourseBasicInfo;

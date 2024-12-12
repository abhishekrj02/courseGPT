import { Button } from "@/components/ui/button";
import { PuzzleIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/FirebaseConfig";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";

function CourseBasicInfo({ course, refreshData }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState("/uploadLogo.svg");

    const onFileSelected = async (event) => {
        const file = event.target.files[0]; // Get the first selected file
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

    return (
        <div className="p-10 border rounded-xl shadow-sm mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="my-auto">
                    <h2 className="font-bold text-xl md:text-3xl">
                        {course?.courseOutput?.CourseName}{" "}
                        <EditCourseBasicInfo
                            course={course}
                            refreshData={() => refreshData(true)}
                        />
                    </h2>
                    <p className="text-sm text-gray-400 mt-3 text-justify">
                        {course?.courseOutput?.Description}
                    </p>

                    <h2 className="font-medium mt-4 flex gap-2 items-center text-primary">
                        <PuzzleIcon />
                        {course?.category}
                    </h2>
                    <Button className="w-full mt-4">Start</Button>
                </div>

                <div className="h-full">
                    <label htmlFor="upload-image" className="cursor-pointer">
                        <div>
                            <Image
                                alt="Upload Logo"
                                src={filePreview || "/uploadLogo.svg"}
                                width={50}
                                height={50}
                                className="w-full rounded-xl  object-cover bg-gray-400"
                            />
                        </div>
                    </label>
                    <input
                        type="file"
                        id="upload-image"
                        className="hidden"
                        onChange={onFileSelected}
                    />
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

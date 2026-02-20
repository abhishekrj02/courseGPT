"use client";
import { Button } from "@/components/ui/button";
import { storage } from "@/config/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Camera, Loader2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import axios from "axios";

function CourseBasicInfo({ course, refreshData, edit = false }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const bannerSrc = course?.courseBanner && course.courseBanner !== ""
    ? course.courseBanner
    : "/defaultBanner.jpg";

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !course?.courseId) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Please select a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5 MB.");
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `course-banners/${course.courseId}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await axios.put(process.env.NEXT_PUBLIC_SERVER_URL + "/api/courses/banner", {
        courseId: course.courseId,
        courseBanner: url,
      });

      refreshData?.();
    } catch (err) {
      console.error("Banner upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 border border-border bg-card rounded-2xl mt-5 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info */}
        <div className="flex flex-col justify-center">
          <h2 className="font-bold text-2xl md:text-3xl text-foreground leading-tight">
            {course?.courseOutput?.CourseName}
          </h2>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            {course?.courseOutput?.Description}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Tag className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-500">{course?.category}</span>
          </div>
          <Link href={"/course/" + course?.courseId + "/start"} className="mt-6">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-2.5">
              Start Course
            </Button>
          </Link>
        </div>

        {/* Banner image with upload overlay */}
        <div className="relative rounded-xl overflow-hidden group">
          <Image
            alt="Course banner"
            src={bannerSrc}
            unoptimized={bannerSrc !== "/defaultBanner.jpg"}
            width={400}
            height={300}
            className="w-full h-[220px] object-cover rounded-xl"
          />

          {/* Upload overlay — only shown in edit mode */}
          {edit && (
            <>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
              <div
                onClick={() => !uploading && fileRef.current?.click()}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer rounded-xl"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-7 w-7 text-white animate-spin mb-2" />
                    <span className="text-white text-xs font-medium">Uploading...</span>
                  </>
                ) : (
                  <>
                    <Camera className="h-7 w-7 text-white mb-2" />
                    <span className="text-white text-xs font-medium">Change thumbnail</span>
                    <span className="text-white/60 text-[10px] mt-1">JPG, PNG, WebP · max 5 MB</span>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;

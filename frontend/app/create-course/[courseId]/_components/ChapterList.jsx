import { CheckboxIcon } from "@radix-ui/react-icons";
import { TimerIcon } from "lucide-react";
import React from "react";

function ChapterList({ course, refreshData}) {
  return (
    <div className="mt-3">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.Chapters.map((chapter, index) =>
          chapter?.chapterName && chapter?.description ? (
            <div
              key={index}
              className="border p-5 rounded-lg mb-2 flex justify-between items-end"
            >
              <div className="flex gap-5">
                <div className="bg-primary h-10 w-10 min-w-10 mt-2 text-white rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-lg">
                      {chapter.chapterName}
                    </h3>
                  </div>
                  {/* <p className="text-lg text-gray-500 text-justify">
                                    {chapter.about}
                                </p> */}
                  <p className="text-sm text-gray-600 text-justify">
                    {chapter.description}
                  </p>
                  <p className="flex gap-2 text-gray-500 items-center mt-1">
                    <TimerIcon />
                    {chapter.duration}
                  </p>
                </div>
              </div>
              <CheckboxIcon className="h-6 w-6 min-w-6 text-primary" />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default ChapterList;

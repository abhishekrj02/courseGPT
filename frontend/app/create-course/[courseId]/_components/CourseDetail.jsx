import { BarChart4, Clock10Icon, Notebook, VideoIcon } from "lucide-react";
import React from "react";

function CourseDetail({ course }) {
    return (
        <div className="border p-6 rounded-xl shadow-sm mt-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:justify-items-center">
                <div className="flex gap-2 ">
                    <BarChart4 width={30} height={30} className="text-3xl text-primary" />
                    <div>
                        <h2 className="text-xs text-gray-500">Difficulty</h2>
                        <h2 className="font-semibold md:text-lg -mt-1">
                            {course?.difficulty}
                        </h2>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <Clock10Icon width={30} height={30} className="text-3xl text-primary" />
                    <div>
                        <h2 className="text-xs text-gray-500">Duration</h2>
                        <h2 className="font-semibold md:text-lg -mt-1">
                            {course?.courseOutput?.totalDuration}
                        </h2>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Notebook width={30} height={30} className="text-3xl text-primary" />
                    <div>
                        <h2 className="text-xs text-gray-500">Chapters</h2>
                        <h2 className="font-semibold md:text-lg -mt-1">
                            {course?.courseOutput?.noOfChapters}
                        </h2>
                    </div>
                </div>

                <div className="flex gap-2">
                    <VideoIcon width={30} height={30} className="text-3xl text-primary" />
                    <div>
                        <h2 className="text-xs text-gray-500">Video Included</h2>
                        <h2 className="font-semibold md:text-lg -mt-1">
                            {course?.includeVideo}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetail;

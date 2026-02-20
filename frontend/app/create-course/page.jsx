"use client";
import { Button } from "@/components/ui/button";
import { ClipboardEditIcon, Grid2X2, Lightbulb } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import SelectCategory from "./_component/SelectCategory";
import TopicDescription from "./_component/TopicDescription";
import SelectOption from "./_component/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/config/AiModel";
import LoadingDialog from "./_component/LoadingDialog";
import { useUser } from "@clerk/nextjs";
import uuid4 from "uuid4";
import { useRouter } from "next/navigation";
import axios from "axios";

const STEPS = [
  { id: 1, name: "Category",    icon: Grid2X2 },
  { id: 2, name: "Topic & Desc", icon: Lightbulb },
  { id: 3, name: "Options",     icon: ClipboardEditIcon },
];

function CreateCourse() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  useEffect(() => {}, [userCourseInput]);

  const checkStatus = () => {
    if (!userCourseInput || userCourseInput.length === 0) return true;
    if (activeIndex === 0 && !userCourseInput?.category) return true;
    if (activeIndex === 1 && !userCourseInput?.topic) return true;
    if (activeIndex === 2 && (!userCourseInput?.difficulty || !userCourseInput?.duration)) return true;
    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);
    const PROMPT = `Generate a course tutorial for following details with field as CourseName, Description(add your own), topic: ${userCourseInput?.topic}, for description ${userCourseInput?.description}, category: ${userCourseInput?.category}, noOfChapters: ${userCourseInput?.noOfChapters}, totalDuration: ${userCourseInput?.duration}, difficulty: ${userCourseInput?.difficulty}, along with Chapters = chapterName, about, description, duration for each chapter in JSON format`;
    const result = await GenerateCourseLayout_AI.sendMessage(PROMPT);
    setLoading(false);
    SaveCourseLayoutInDb(JSON.parse(result.response?.text()));
  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
    const id = uuid4();
    setLoading(true);
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "/api/courses", {
        courseId: id,
        name: userCourseInput?.topic,
        difficulty: userCourseInput?.difficulty,
        category: userCourseInput?.category,
        includeVideo: userCourseInput?.displayVideo,
        courseOutput: courseLayout,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        username: user?.fullName,
        userProfileImage: user?.imageUrl,
      });
      if (response.status === 201) router.replace("/create-course/" + id);
    } catch (error) {
      console.error("Failed to save course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-12">
      {/* Stepper */}
      <div className="flex flex-col items-center mt-10 mb-12 px-6">
        <h2 className="text-3xl font-bold text-foreground mb-10">Create a Course</h2>
        <div className="flex items-center">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const done = activeIndex > index;
            const active = activeIndex === index;
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${done ? "bg-blue-600 text-white"
                      : active ? "bg-primary text-white ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`hidden md:block text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.name}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`h-0.5 w-16 md:w-24 lg:w-36 mx-2 mb-5 rounded-full transition-all duration-300
                    ${activeIndex > index ? "bg-blue-600" : "bg-border"}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="px-6 md:px-20 lg:px-44">
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          {activeIndex === 0 && <SelectCategory />}
          {activeIndex === 1 && <TopicDescription />}
          {activeIndex === 2 && <SelectOption />}
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
            className="rounded-xl px-6 disabled:opacity-30"
          >
            Previous
          </Button>
          {activeIndex < 2 ? (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 disabled:opacity-40"
            >
              Next
            </Button>
          ) : (
            <Button
              disabled={checkStatus()}
              onClick={GenerateCourseLayout}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 disabled:opacity-40"
            >
              Generate Course
            </Button>
          )}
        </div>
      </div>

      <LoadingDialog loading={loading} />
    </div>
  );
}

export default CreateCourse;

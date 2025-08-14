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
import { db } from "@/config/db";
import { useUser } from "@clerk/nextjs";
import uuid4 from "uuid4";
import { CourseList } from "@/config/schema";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import axios from "axios";

function CreateCourse() {
  const { user } = useUser();
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <Grid2X2 />,
    },
    {
      id: 1,
      name: "Topic & Desc",
      icon: <Lightbulb />,
    },
    {
      id: 1,
      name: "Options",
      icon: <ClipboardEditIcon />,
    },
  ];

  const [loading, setLoading] = useState(false);
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  useEffect(() => { }, [userCourseInput]);
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = 2;
  const router = useRouter();

  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      activeIndex == 0 &&
      (userCourseInput?.category?.length == 0 ||
        userCourseInput?.category == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.difficulty == undefined ||
        userCourseInput?.duration == undefined)
    ) {
      return true;
    }
    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);

    const USER_INPUT_PROMPT = `Generate a course tutorial for following details with field as CourseName, Description(add your own), topic: ${userCourseInput?.topic}, for description ${userCourseInput?.description}, category: ${userCourseInput?.category}, noOfChapters: ${userCourseInput?.noOfChatpers}, totalDuration: ${userCourseInput?.duration}, difficulty: ${userCourseInput?.difficulty}, along with Chapters = chapterName, about, description, duration for each chapter in JSON format`;
    console.log(USER_INPUT_PROMPT)
    const result = await GenerateCourseLayout_AI.sendMessage(USER_INPUT_PROMPT);
    // console.log(JSON.parse(result.response?.text()));
    setLoading(false);
    SaveCourseLayoutInDb(JSON.parse(result.response?.text()));
    console.log(userCourseInput);
  };

  const SaveCourseLayoutInDbOld = async (courseLayout) => {
    var id = uuid4();
    setLoading(true);
    const result = await db.insert(CourseList).values({
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
    // console.log("Finish");
    setLoading(false);
    router.replace("/create-course/" + id);
  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
    var id = uuid4();
    setLoading(true);
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + '/api/courses', {
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

      if (response.status === 201) {
        router.replace("/create-course/" + id);
      } else {
        console.error("Error saving course:", response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to save course:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center mt-10 ">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex">
          {StepperOptions.map((item, index) => (
            <div key={index} className="flex items-center mt-10">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white
                  ${activeIndex >= index && "bg-primary"}`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 
                    ${activeIndex >= index + 1 && "bg-primary"}`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <TopicDescription />
        ) : activeIndex == 2 ? (
          <SelectOption />
        ) : null}

        <div className="flex justify-between mt-10">
          <Button
            disabled={activeIndex == 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}
          {activeIndex == 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => GenerateCourseLayout()}
            >
              Generate
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
}

export default CreateCourse;

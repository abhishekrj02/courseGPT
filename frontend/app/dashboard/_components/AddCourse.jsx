"use client";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import React, { useContext } from "react";

function AddCourse() {
  const { user } = useUser();
  const { userCourseList } = useContext(UserCourseListContext);
  const atLimit = (userCourseList?.length ?? 0) >= 15;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Welcome back</p>
        <h2 className="text-2xl font-bold text-foreground">{user?.fullName ?? "Hello"}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Create AI-powered courses and share them with the world.
        </p>
      </div>
      <div className="flex flex-col items-start sm:items-end gap-1">
        <Link href={atLimit ? "/dashboard/upgrade" : "/create-course"}>
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg">
            <Plus className="h-4 w-4" />
            Create AI Course
          </Button>
        </Link>
        {atLimit && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Limit reached — upgrade for more
          </p>
        )}
      </div>
    </div>
  );
}

export default AddCourse;

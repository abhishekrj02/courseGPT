import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PenBoxIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";

function EditCourseBasicInfo({ course, refreshData }) {
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        setName(course?.courseOutput.CourseName);
        setDescription(course?.courseOutput.Description);
    }, [course]);

    const onUpdateHandler = async () => {
        course.courseOutput.CourseName = name;
        course.courseOutput.Description = description;

        const result = await db
            .update(CourseList)
            .set({ courseOutput: course?.courseOutput })
            .where(eq(CourseList.courseId, course.courseId))
            .returning({ id: CourseList.courseId });
            refreshData(true);
    };
    return (
        <Dialog>
            <DialogTrigger>
                <PenBoxIcon />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course Title & Description</DialogTitle>
                    <DialogDescription>
                        <div className="mt-3">
                            <label>Course Title</label>
                            <Input
                                defaultValue={course?.courseOutput?.CourseName}
                                onChange={(event) =>
                                    setName(event?.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <Textarea
                                className="h-44"
                                defaultValue={course?.courseOutput?.Description}
                                onChange={(event) =>
                                    setDescription(event?.target.value)
                                }
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={onUpdateHandler}>Update</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditCourseBasicInfo;

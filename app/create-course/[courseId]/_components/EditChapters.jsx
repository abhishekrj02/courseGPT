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
import { eq } from "drizzle-orm";
import { CourseList } from "@/config/schema";

function EditChapters({ course, index, refreshData}) {
    const Chapters = course?.courseOutput.Chapters;
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    useEffect(() => {
        setName(Chapters[index].chapterName);
        setDescription(Chapters[index].description);
    }, [course]);

    const onUpdateHandler = async () => {
        course.courseOutput.Chapters[index].chapterName = name;
        course.courseOutput.Chapters[index].description = description;
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
                <PenBoxIcon className="h-8 mx-auto" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Chapter Name & Description</DialogTitle>
                    <DialogDescription>
                        <div className="mt-3">
                            <label>Chapter Name</label>
                            <Input
                                defaultValue={
                                    course?.courseOutput?.Chapters[index]
                                        ?.chapterName
                                }
                                onChange={(event) =>
                                    setName(event?.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <Textarea
                                className="h-44"
                                defaultValue={
                                    course?.courseOutput?.Chapters[index]
                                        ?.description
                                }
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

export default EditChapters;

import React, { useContext } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";

function SelectOption() {
    const { userCourseInput, setUserCourseInput } =
        useContext(UserInputContext);

    const handleInputChange = (fieldName, value) => {
        setUserCourseInput((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };
    return (
        <div className="sm:px-10 md:px-20 lg:px-44 mb-8">
            <div className="grid grid-cols-2 gap-10">
                <div>
                    <label>Difficulty*</label>
                    <Select
                        onValueChange={(value) =>
                            handleInputChange("difficulty", value)
                        }
                        defaultValue={userCourseInput?.difficulty}
                    >
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advance">Advance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label>Course Duration*</label>
                    <Select
                        onValueChange={(value) =>
                            handleInputChange("duration", value)
                        }
                        defaultValue={userCourseInput?.duration}
                    >
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1 hour">1 hour</SelectItem>
                            <SelectItem value="2 hours">2 hours</SelectItem>
                            <SelectItem value="3+ hours">
                                3+ hours
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label>Add Video</label>
                    <Select
                        onValueChange={(value) =>
                            handleInputChange("displayVideo", value)
                        }
                        defaultValue={userCourseInput?.displayVideo}
                    >
                        <SelectTrigger className="">
                            <SelectValue placeholder="Yes" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="text-sm">Number of Chapters</label>
                    <Input
                        type="number"
                        onChange={(e) =>
                            handleInputChange("noOfChatpers", e.target.value)
                        }
                        defaultValue={userCourseInput?.noOfChatpers}
                    />
                </div>
            </div>
        </div>
    );
}
/*
Generate a course tutorial on following details with field
as Course Name, Description, Along with Chapter Name, about, Duration:,Category:
'Programming',Topic:Python, level: intermediate, duration: 3+ hours noOfChapters:20, in JSON format
*/

export default SelectOption;

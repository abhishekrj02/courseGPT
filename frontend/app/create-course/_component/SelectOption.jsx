import React, { useContext } from "react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";

const FIELDS = [
  { key: "difficulty",   label: "Difficulty",          required: true,  type: "select", placeholder: "Select level",    options: ["Beginner", "Intermediate", "Advance"] },
  { key: "duration",     label: "Course Duration",      required: true,  type: "select", placeholder: "Select duration", options: ["1 hour", "2 hours", "3+ hours"] },
  { key: "displayVideo", label: "Include Videos",       required: false, type: "select", placeholder: "Yes",             options: ["Yes", "No"] },
  { key: "noOfChapters", label: "Number of Chapters",   required: false, type: "number", placeholder: "e.g. 5" },
];

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Step 3</p>
      <h2 className="text-lg font-semibold text-foreground mb-6">Configure your course</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <label className="text-sm text-foreground block mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.type === "select" ? (
              <Select
                onValueChange={(v) => handleInputChange(field.key, v)}
                defaultValue={userCourseInput?.[field.key]}
              >
                <SelectTrigger className="rounded-xl h-11">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type="number"
                placeholder={field.placeholder}
                className="h-11 rounded-xl"
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                defaultValue={userCourseInput?.[field.key]}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectOption;

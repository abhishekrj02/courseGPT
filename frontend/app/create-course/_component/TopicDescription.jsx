import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Step 2</p>
      <h2 className="text-lg font-semibold text-foreground mb-6">Describe your course topic</h2>
      <div className="space-y-5">
        <div>
          <label className="text-sm text-foreground block mb-2">
            Topic <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="e.g. Python for Beginners, Yoga for Stress Relief..."
            className="h-12 rounded-xl"
            defaultValue={userCourseInput?.topic}
            onChange={(e) => handleInputChange("topic", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm text-foreground block mb-2">
            Description <span className="text-muted-foreground text-xs">(optional)</span>
          </label>
          <Textarea
            placeholder="Any extra details, target audience, or goals..."
            className="min-h-[100px] rounded-xl resize-none"
            defaultValue={userCourseInput?.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default TopicDescription;

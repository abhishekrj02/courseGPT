import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React, { useContext } from "react";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({ ...prev, category }));
  };

  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Step 1</p>
      <h2 className="text-lg font-semibold text-foreground mb-6">What is this course about?</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CategoryList.map((item, index) => {
          const selected = userCourseInput?.category === item.name;
          return (
            <div
              key={index}
              onClick={() => handleCategoryChange(item.name)}
              className={`flex flex-col items-center gap-3 p-5 rounded-xl border cursor-pointer transition-all duration-200
                ${selected
                  ? "bg-primary/15 border-blue-500 shadow-md shadow-blue-500/10"
                  : "bg-muted/50 border-border hover:bg-muted hover:border-muted-foreground/30"
                }`}
            >
              <Image src={item.icon} alt={item.name} width={44} height={44} />
              <span className={`text-sm font-medium ${selected ? "text-foreground" : "text-muted-foreground"}`}>
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectCategory;

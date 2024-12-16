import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React, { useContext } from "react";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };
  return (
    <div className="px-10 md:px-20">
      <h2 className="my-5 text-lg text-center md:text-left">
        Select the course category*
      </h2>
      <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10">
        {CategoryList.map((item, index) => (
          <div
            key={index}
            className={` flex flex-col p-5 border items-center rounded-xl mb-5 sm:mb-0
             hover:border-primary hover:bg-sky-50 transition-all duration-300 
             cursor-pointer ${userCourseInput?.category == item.name && 'bg-sky-50 border-primary'}`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.icon} alt={item.name} width={50} height={50} />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;

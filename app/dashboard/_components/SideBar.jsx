"use client";
import React, { useContext } from "react";
import logo from "../../../public/logo.svg";
import Image from "next/image";
import { Box, Codesandbox, FileStackIcon, Home, LogOutIcon, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
function SideBar() {
    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext)
    const Menu = [
        {
            id: 1,
            name: "Home",
            icon: <Home />,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "Explore",
            icon: <FileStackIcon />,
            path: "/dashboard/explore",
        },
        {
            id: 3,
            name: "Upgrade",
            icon: <Shield />,
            path: "/dashboard/upgrade",
        },
        {
            id: 4,
            name: "Logout",
            icon: <LogOutIcon />,
            path: "/",
        },
    ];
    const path = usePathname();
    return (
        <div className="fixed h-full md:w-64 p-5 shadow-md">
            <div className="flex gap-4 px=12 justify-center">
                {/* <Image src={logo} alt="logo" width={30} height={30} /> */}
                
                <Codesandbox />
                <h1 className="text-xl hidden md:block">CourseGPT</h1>
            </div>
            <hr className="my-5" />
            <ul>
                {Menu.map((item, index) => (
                    <Link href={item.path} key={index}>
                        <div
                            className={`flex  gap-4 rounded-sm px-6 py-4 text-black hover:bg-sky-50 cursor-pointer transition-all duration-300 ${item.path == path && "bg-sky-50"
                                }`}
                        >
                            <div className="text-xl">{item.icon}</div>
                            <div>{item.name}</div>
                        </div>
                    </Link>
                ))}
            </ul>
            <div className="absolute bottom-10 w-[80%]">
                <Progress value={(userCourseList?.length) / 15 * 100} />
                <h2 className="text-sm my-2 text-center">
                    {userCourseList?.length} Out of 15 Course Created
                </h2>
                <h2 className="text-xs text-center  text-gray-500">
                    Upgrade your plan for unlimited course generation.
                </h2>
            </div>
        </div>
    );
}

export default SideBar;

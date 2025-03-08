"use client";
import React, { useContext, useState } from "react";
import logo from "../../../public/logo.svg";
import Image from "next/image";
import { Box, Codesandbox, FileStackIcon, Home, LogOutIcon, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Close } from "@radix-ui/react-dialog";
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <div onClick={toggleMenu} className="cursor-pointer fixed md:hidden top-4 left-4 z-50">
            {isMenuOpen? <Cross1Icon className="text-black w-6 h-6"/>:<HamburgerMenuIcon className="text-black w-8 h-8" />}
            </div>
            {isMenuOpen && (
                <div className="fixed h-full w-full bg-white md:hidden z-40 p-5 shadow-md">


                    <div className="md:hidden">
                        <h1 className="text-xl text-center">Code3</h1>
                        <hr className="my-5" />
                        <ul>
                            {Menu.map((item, index) => (
                                <Link href={item.path} key={index}>
                                    <div
                                        className={`flex gap-4 rounded-sm px-6 py-4 text-black hover:bg-sky-50 cursor-pointer transition-all duration-300 ${item.path === path && "bg-sky-50"}`}
                                    >
                                        <div className="text-xl">{item.icon}</div>
                                        <div>{item.name}</div>
                                    </div>
                                </Link>
                            ))}
                        </ul>
                        <div className="flex items-center justify-center h-full">
                            <div className="absolute bottom-10 w-[80%]">
                                <Progress value={(userCourseList?.length / 15) * 100} />
                                <h2 className="text-sm my-2 text-center">
                                    {userCourseList?.length} Out of 15 Courses Created
                                </h2>
                                <h2 className="text-xs text-center text-gray-500">
                                    Upgrade your plan for unlimited course generation.
                                </h2>
                            </div>
                        </div>
                    </div>

                </div>)}

            <div className="fixed h-full md:block hidden md:w-64 p-5 shadow-md">
                <div className="flex gap-4 px=12 justify-center">
                    <Codesandbox />
                    <h1 className="text-xl ">Code3</h1>
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
        </div>

    );
}

export default SideBar;

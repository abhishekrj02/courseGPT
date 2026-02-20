"use client";
import { UserButton } from "@clerk/nextjs";
import { BookOpen, LayoutDashboard, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTheme } from "@/app/_context/ThemeContext";

function getTitle(path) {
  if (path === "/dashboard") return "Home";
  if (path === "/dashboard/explore") return "Explore";
  if (path === "/dashboard/upgrade") return "Upgrade";
  if (path.startsWith("/create-course")) return "Create Course";
  if (path.startsWith("/course")) return "Course";
  return "Dashboard";
}

function Header() {
  const path = usePathname();
  const { theme, toggleTheme } = useTheme();
  const title = getTitle(path);
  const isOnDashboard = path.startsWith("/dashboard");

  return (
    <div className="flex justify-between items-center px-6 py-3.5 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      {/* Left: logo (mobile) + page title */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="md:hidden">
          <BookOpen className="h-5 w-5 text-blue-500" />
        </Link>
        <h1 className="text-sm font-semibold text-foreground tracking-wide">{title}</h1>
      </div>

      {/* Right: dashboard button (outside dashboard) + theme toggle + avatar */}
      <div className="flex items-center gap-2">
        {!isOnDashboard && (
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted hover:bg-muted/80 transition-colors text-sm font-medium text-foreground"
          >
            <LayoutDashboard className="h-4 w-4 text-blue-500" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        )}

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <UserButton />
      </div>
    </div>
  );
}

export default Header;

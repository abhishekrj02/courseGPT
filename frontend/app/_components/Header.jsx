import React from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { BookOpen } from "lucide-react";

function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-2.5">
        <BookOpen className="h-5 w-5 text-blue-500" />
        <span className="text-base font-semibold text-foreground tracking-tight">CourseGPT</span>
      </div>
      <Link href="/dashboard">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 rounded-lg">
          Get Started
        </Button>
      </Link>
    </header>
  );
}

export default Header;

"use client";
import { useClerk } from "@clerk/nextjs";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useEffect } from "react";

export default function Home() {
  const { signOut } = useClerk();
  useEffect(() => {
    signOut().catch(() => {});
  }, [signOut]);

  return (
    <div className="min-h-screen w-full relative bg-background">
      <div className="absolute inset-0 z-0 pointer-events-none app-gradient" />
      <div className="relative z-10">
        <Header />
        <Hero />
      </div>
    </div>
  );
}

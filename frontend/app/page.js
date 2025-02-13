'use client'
import { useClerk } from "@clerk/nextjs";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useEffect } from "react";

export default function Home() {
  const { signOut } = useClerk();
  useEffect(() => {
    const logoutUser = async () => {
      try {
        await signOut();
      } catch (error) {
        console.error("Logout failed", error);
      }
    };
    logoutUser();
  }, [signOut]);
  return (
    <div>
      
      <Header />
      <Hero />
    </div>
  );
}

"use client";
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
        <div className="min-h-screen w-full relative bg-black">
              {/* X Organizations Black Background with Top Glow */} {" "}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
                }}
            />
              {/* Your Content/Components */}
            <div className="relative z-10">
                <Header />
                <Hero />
            </div>
        </div>
    );
}

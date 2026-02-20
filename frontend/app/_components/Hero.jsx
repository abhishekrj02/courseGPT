import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, BookOpen, Sparkles, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "AI-Powered",
    desc: "Leverages Google Gemini to create structured, personalized courses instantly.",
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: BookOpen,
    title: "Custom Courses",
    desc: "Tailored content based on your topic, skill level, and learning goals.",
    color: "text-purple-500",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Sparkles,
    title: "Ready to Share",
    desc: "Publish your course and share a direct link with anyone, for free.",
    color: "text-pink-500",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
];

function Hero() {
  return (
    <div className="mx-auto max-w-screen-xl px-6">
      <section className="py-24 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-500 border border-blue-500/30 bg-blue-500/10 px-3 py-1 rounded-full mb-6">
          Powered by Google Gemini
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-foreground leading-tight">
          Create AI Courses
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            in seconds.
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Unlock personalized education with AI-driven course creation.
          Tailor your learning journey to fit your unique goals and pace.
        </p>
        <div className="mt-10">
          <Link href="/dashboard">
            <Button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-sm font-semibold rounded-xl">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="pb-24">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className={`rounded-xl border p-6 ${f.bg}`}>
                <div className="mb-4 inline-flex p-2.5 rounded-lg bg-background/50">
                  <Icon className={`h-6 w-6 ${f.color}`} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Hero;

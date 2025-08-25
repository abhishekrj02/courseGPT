import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, BookOpen, Sparkles } from "lucide-react"

function Hero() {
  return (
    <div>
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex  lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-primary">
              CourseGPT
              <strong className="font-extrabold sm:text-4xl tex-2xl text-white sm:block">
                AI Course Generator
              </strong>
            </h1>
            <h2 className="text-lg text-gray-400"> Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Google Gemini</span></h2>

            <p className="mt-4 sm:text-xl/relaxed text-white">
              Unlock personalized education with AI-driven course creation.
              Tailor your learning journey to fit your unique goal and pace.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-sky-600 focus:outline-none focus:ring active:bg-sky-800 sm:w-auto"
                href="/dashboard"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-[72rem] md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <Brain className="h-12 w-12 mb-4" />
              <h3 className="font-bold mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Leverages advanced AI to create personalized learning experiences
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <BookOpen className="h-12 w-12 mb-4" />
              <h3 className="font-bold mb-2">Custom Courses</h3>
              <p className="text-sm text-muted-foreground">
                Tailored content based on your skill level and learning goals
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Sparkles className="h-12 w-12 mb-4" />
              <h3 className="font-bold mb-2">Interactive</h3>
              <p className="text-sm text-muted-foreground">
                Engaging learning materials with exercises and assessments
              </p>
            </CardContent>
          </Card>
        </div>
      </section> */}

    </div>
  );
}

export default Hero;



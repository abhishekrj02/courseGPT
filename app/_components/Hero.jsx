import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex  lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-primary">
              CourseGPT
              <strong className="font-extrabold sm:text-4xl tex-2xl text-black sm:block">
                AI Course Generator
              </strong>
            </h1>
            <h2 className="text-lg"> Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Google Gemini</span></h2>

            <p className="mt-4 sm:text-xl/relaxed text-black">
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
    </div>
  );
}

export default Hero;

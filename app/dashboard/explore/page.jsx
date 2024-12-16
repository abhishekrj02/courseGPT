'use client'
import { db } from '@/config/db'
import { CourseList } from '@/config/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard'
import Image from 'next/image'

function Explore() {
  const [courses, setCourses] = useState();
  useEffect(() => {
    getAllCourse();
  }, [])
  const [loading, setLoading] = useState(true);

  const getAllCourse = async () => {
    setLoading(true);
    const result = await db.select().from(CourseList)
      .where(eq(CourseList.publish, true))
      .limit(10)
      .offset(0);
    setCourses(result);
    setLoading(false);
  }

  return (
    <>
      <h2 className="font-medium text-xl mb-4">Explore More Courses</h2>
      {loading ? (
        // Show loading spinner when fetching data
        <div className="h-[200px] w-full flex items-center justify-center">
          <Image src={"/loading2.gif"} width={50} height={50} alt="loading" />
        </div>
      ) : courses?.length > 0 ? (
        // Show courses when data is available
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course, index) => (
            <CourseCard
              viewOnly={true}
              refreshData={() => getUserCourses()}
              course={course}
              key={index}
            />
          ))}
        </div>
      ) : (
        // Show "no courses" message if array is empty
        <div className="h-[200px] w-full flex items-center justify-center">
          <p>No courses to show</p>
        </div>
      )}
    </>
  )
}

export default Explore
'use client'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard'
import axios from 'axios';
function Explore() {
  const [courses, setCourses] = useState();
  useEffect(() => {
    getAllCourse();
  }, [])
  const [loading, setLoading] = useState(true);



const getAllCourse = async () => {
    try {
        setLoading(true);
        
        const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/api/courses/all');

        if (response.status === 200) {
            setCourses(response.data);
        } else {
            console.error("Failed to fetch courses:", response.data);
        }
    } catch (error) {
        console.error("Error fetching courses:", error);
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="relative z-10">
      <h2 className="font-medium text-xl mb-4">Explore More Courses</h2>
      {loading ? (
        // Show loading spinner when fetching data
        <div className="h-[200px] w-full flex items-center justify-center">
          <div className="loader" />
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
    </div>
  )
}

export default Explore
'use client'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard'
import axios from 'axios'
import { Compass } from 'lucide-react'

function Explore() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getAllCourse(); }, []);

  const getAllCourse = async () => {
    try {
      setLoading(true);
      const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/api/courses/all');
      if (response.status === 200) setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-5">
        <Compass className="h-4 w-4 text-blue-500" />
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Explore Courses</h2>
      </div>

      {loading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="loader" />
        </div>
      ) : courses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course, index) => (
            <CourseCard key={index} viewOnly={true} course={course} />
          ))}
        </div>
      ) : (
        <div className="h-48 flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card">
          <Compass className="h-8 w-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No published courses yet.</p>
        </div>
      )}
    </div>
  );
}

export default Explore;

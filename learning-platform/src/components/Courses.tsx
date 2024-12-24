import axios, { AxiosError } from "axios";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { useEffect, useState } from "react";
import { decodeToken } from "./decodeToken";
import { Enroll } from "./Enroll";
import { BookOpen } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface courseType {
  id: number;
  title: string;
  description: string;
  instructor: string;
  category: string;
}

export const Courses = () => {
  const [courses, setCourses] = useState<courseType[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getCourses = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/courses");
        setCourses(data.courses);
      } catch (error) {
        if(error instanceof AxiosError) {
            if(error.response) {
              const { message } = error.response.data; 
              return toast.error(message ?? "Something went wrong");
            }

        }
          return toast.error("Something went wrong");
      }
    };
    getCourses();
  }, []);

  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-between mt-16">
        <h1 className="text-3xl font-medium">Courses we offer</h1>
        {
          token && decodeToken(token).role === "INSTRUCTOR" ? (
            <a
              href="/add-course"
              className="py-2 px-4 border-black border-2 rounded-lg"
            >
              Add Course
            </a>
          ) : null
        }
      </div>
      {courses.length > 0 ? (
        <div className="h-[500px] my-10 grid grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="border-[1.5px] rounded-lg border-neutral-300 flex flex-col w-[370px] h-[300px] shadow-sm">
                <div className="bg-[#f4f4f5] w-full h-[150px]"/>
                <div className="p-4">
              <h2 className="text-xl font-medium">{course.title}</h2>
              <p className="text-neutral-600 text-[15px]">{course.description}</p>
              <div className="text-sm flex items-end justify-between h-[80px] text-neutral-600">
                <div className="flex flex-col">
                <span>Instructor: {course.instructor}</span>
                <span>Category: {course.category}</span>
                </div>
                <div className="flex gap-1">
                {
                  token && decodeToken(token).role === "INSTRUCTOR" ? <a href={`/assignments/${course.id}`} className="block py-2 px-4 bg-black text-white rounded-lg"><BookOpen className="w-5 h-5"/></a> : null
                }
                { 
                  token && decodeToken(token).role === "INSTRUCTOR" ? <a href={`/assign-task/${course.id}`} className="block py-2 px-4 bg-black text-white rounded-lg">Assign Task</a> : <Enroll token={token as string} courseId={course.id}/>
                }
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[500px] flex items-center justify-center">
          <p className="text-center text-lg">No courses available!</p>
        </div>
      )}
      <Toaster />
    </MaxWidthWrapper>
  );
};

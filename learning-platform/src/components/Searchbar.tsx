import axios, { AxiosError } from "axios";
import { BookOpen, Search } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { decodeToken } from "./decodeToken";
import { Enroll } from "./Enroll";

interface courseType {
  id: number;
  title: string;
  description: string;
  instructor: string;
  category: string;
}

export const Searchbar = () => {
  const token = localStorage.getItem("token");
  const [value, setValue] = useState("");
  const [result, setResult] = useState<courseType[]>([]);

  const handleSearch = async (e: any) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(
        `http://localhost:3000/search-courses?query=${value}`
      );
      setResult(data.courses);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const { message } = error.response.data;
          return toast.error(message ?? "Something went wrong");
        }
      }
      return toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-full my-5">
      <form onSubmit={handleSearch}>
        <div className="flex items-center border border-black w-[32rem] mx-auto">
          <input
            type="text"
            placeholder="Search course"
            className="border-none outline-none w-full py-2 px-4"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="bg-black text-white px-4 py-2" type="submit" disabled={value.length === 0}>
            <Search />
          </button>
        </div>
      </form>
      <div className="h-[500px] mt-4">
        {result.length > 0 ? (
          <div className="h-[500px] my-10 grid grid-cols-3 gap-8">
            {result.map((course) => (
              <div
                key={course.id}
                className="border-[1.5px] rounded-lg border-neutral-300 flex flex-col w-[370px] h-[300px] shadow-sm"
              >
                <div className="bg-[#f4f4f5] w-full h-[150px]" />
                <div className="p-4">
                  <h2 className="text-xl font-medium">{course.title}</h2>
                  <p className="text-neutral-600 text-[15px]">
                    {course.description}
                  </p>
                  <div className="text-sm flex items-end justify-between h-[80px] text-neutral-600">
                    <div className="flex flex-col">
                      <span>Instructor: {course.instructor}</span>
                      <span>Category: {course.category}</span>
                    </div>
                    <div className="flex gap-1">
                      {token && decodeToken(token).role === "INSTRUCTOR" ? (
                        <a
                          href={`/assignments/${course.id}`}
                          className="block py-2 px-4 bg-black text-white rounded-lg"
                        >
                          <BookOpen className="w-5 h-5" />
                        </a>
                      ) : null}
                      {token && decodeToken(token).role === "INSTRUCTOR" ? (
                        <a
                          href={`/assign-task/${course.id}`}
                          className="block py-2 px-4 bg-black text-white rounded-lg"
                        >
                          Assign Task
                        </a>
                      ) : (
                        <Enroll token={token as string} courseId={course.id} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <Toaster />
    </div>
  );
};

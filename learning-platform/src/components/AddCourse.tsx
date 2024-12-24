import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { tokenType } from "./decodeToken";
import toast, { Toaster } from "react-hot-toast";


export const AddCourse = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if(!token) {
        navigate('/');
        return;
    }

    const decodedToken = jwtDecode<tokenType>(token);

    if(decodedToken.role !== "INSTRUCTOR") {
        navigate('/');
        return;
    }

    const email = decodedToken.email;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:3000/add-course", {title, description, category, instructorEmail: email});
          navigate("/courses");
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

  return (
    <div className="bg-[#f4f4f5] flex items-center justify-center h-screen">
      <div className="w-[420px] flex flex-col p-6 bg-white outline-1 outline outline-neutral-200 shadow-md rounded-xl">
        <h1 className="text-2xl font-medium mx-auto">Add a Course</h1>
        <p className="text-center text-slate-500 my-1">
          Add course for your students
        </p>
        <form className="flex flex-col w-[360px] mt-10" onSubmit={handleSubmit}>
          <label htmlFor="title" className="text-sm font-medium tracking-wide">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="border-[1.5px] mb-4 mt-2 py-1 px-3 rounded-md shadow-sm focus:outline"
            placeholder="Insert title here"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
          />
          <label
            htmlFor="description"
            className="text-sm font-medium tracking-wide mt-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="border-[1.5px] mb-4 mt-2 py-1 px-3 rounded-md shadow-sm focus:outline"
            placeholder="Insert description here"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
          />
          <label
            htmlFor="Category"
            className="text-sm font-medium tracking-wide mt-2"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            className="border-[1.5px] mb-4 mt-2 py-1 px-3 rounded-md shadow-sm focus:outline"
            placeholder="Category"
            value={category}
            onChange={(e)=> setCategory(e.target.value)}
          />
          <button
            className="bg-black text-white rounded-md py-1.5 font-medium my-3"
            type="submit"
          >
            Add Course
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};
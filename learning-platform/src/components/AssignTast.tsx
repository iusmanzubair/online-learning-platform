import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export const AssignTask = () => {
    const token = localStorage.getItem('token');
    if(!token)
        return null;

    const decodedToken = jwtDecode<{id: "number", role: "INSTRUCTOR" | "STUDENT"}>(token);
    if(decodedToken.role !== "INSTRUCTOR")
        return null;

  const {courseId} = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/assign-task", {title, description, dueDate, courseId});
      navigate("/assignments");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#f4f4f5] flex items-center justify-center h-screen">
      <div className="w-[420px] flex flex-col p-6 bg-white outline-1 outline outline-neutral-200 shadow-md rounded-xl">
        <h1 className="text-2xl font-medium mx-auto">Assign Task</h1>
        <p className="text-center text-slate-500 my-1">
          Assign task for your students
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
            htmlFor="dueDate"
            className="text-sm font-medium tracking-wide mt-2"
          >
            Due Date
          </label>
          <input
            type="text"
            id="dueDate"
            className="border-[1.5px] mb-4 mt-2 py-1 px-3 rounded-md shadow-sm focus:outline"
            placeholder="MM/DD/YYYY"
            value={dueDate}
            onChange={(e)=> setDueDate(e.target.value)}
          />
          <button
            className="bg-black text-white rounded-md py-1.5 font-medium my-3"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};




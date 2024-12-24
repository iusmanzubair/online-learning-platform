import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast'

export const CreateInstructor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/create-instructor", {name, email, password});
      navigate("/instructor-login");
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
        <h1 className="text-2xl font-medium mx-auto">Register as Instructor</h1>
        <p className="text-center text-slate-500 my-1">
          Register with your name, email and password
        </p>
        <form className="flex flex-col w-[360px] mt-8" onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-sm font-medium tracking-wide">
            Name
          </label>
          <input type="text" id="name" className="border-[1.5px] mb-4 mt-2 py-1 px-3 rounded-md shadow-sm focus:outline" placeholder="John" value={name} onChange={(e)=> setName(e.target.value)} />
          <label htmlFor="email" className="text-sm font-medium tracking-wide mt-2" >Email</label>
          <input type="text" id="email" className="border-[1.5px] mb-4 mt-2 py-1 px-3 rounded-md shadow-sm focus:outline" placeholder="mail@example.com" value={email} onChange={(e)=> setEmail(e.target.value)} />
          <label htmlFor="password" className="text-sm font-medium tracking-wide mt-2" >Password</label>
          <input type="text" id="password" className="border-[1.5px] mb-4 mt-2 py-1 px-3 rounded-md shadow-sm focus:outline" placeholder="******" value={password} onChange={(e)=> setPassword(e.target.value)} />
          <button className="bg-black text-white rounded-md py-1.5 font-medium my-3" type="submit">Register</button>
          <p className="text-sm text-center">Already have account?{" "}<a href="/instructor-login" className="underline text-blue-600">Login</a></p>
        </form>
      </div>
      <Toaster />
    </div>
  );
};
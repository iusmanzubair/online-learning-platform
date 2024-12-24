import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

export const InstructorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/instructor-login", { email, password });
      localStorage.setItem("token", data.token)
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
        <h1 className="text-2xl font-medium mx-auto">Login as Instructor</h1>
        <p className="text-center text-slate-500 my-1">
          Login with your email and password
        </p>
        <form className="flex flex-col w-[360px] mt-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-sm font-medium tracking-wide mt-2">
            Email
          </label>
          <input type="text" id="email" className="border-[1.5px] mb-4 mt-2 py-1 px-3 rounded-md shadow-sm focus:outline" placeholder="mail@example.com" value={email} onChange={(e)=> setEmail(e.target.value)} />
          <label htmlFor="password" className="text-sm font-medium tracking-wide mt-2" >
            Password
          </label>
          <input type="text" id="password" className="border-[1.5px] mb-4 mt-2 py-1 px-3 rounded-md shadow-sm focus:outline" placeholder="******" value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <button className="bg-black text-white rounded-md py-1.5 font-medium my-3" type="submit">
            Login
          </button>
          <p className="text-sm text-center">Don't have an account?{" "}<a href="/create-instructor" className="underline text-blue-600">Register</a></p>
        </form>
      </div>
      <Toaster />
    </div>
  );
};


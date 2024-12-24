import { jwtDecode } from "jwt-decode";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { tokenType } from "./decodeToken";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router";
import { CircleCheck, CircleX, Pencil, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface infoType {
  id: string;
  title: string;
}

export const Settings = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const { id } = useParams();
  const navigate = useNavigate();
  const decodedToken = jwtDecode<tokenType>(token);
  const [info, setInfo] = useState<infoType[]>([]);
  const [name, setName] = useState<string>(decodedToken.name);
  const [edit, setEdit] = useState<boolean>(true);
  useEffect(() => {
    const getInformation = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/${decodedToken.role.toLowerCase()}-info/${id}`
        );
        setInfo(data.courses);
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
    getInformation();
  }, []);

  const deleteAccount = async ()=> {
    try {
      await axios.delete(`http://localhost:3000/${decodedToken.role.toLowerCase()}-info/${id}`)
      localStorage.removeItem('token');
      navigate("/");
    } catch (error) {
      if(error instanceof AxiosError) {
            if(error.response) {
              const { message } = error.response.data; 
              return toast.error(message ?? "Something went wrong");
            }

        }
          return toast.error("Something went wrong");
    }
  }

  const deleteCourse = async (id: string)=> {
    try {
      await axios.delete(`http://localhost:3000/delete-course/${id}`);
      navigate(0); 
    } catch (error) {
      if(error instanceof AxiosError) {
            if(error.response) {
              const { message } = error.response.data; 
              return toast.error(message ?? "Something went wrong");
            }

        }
          return toast.error("Something went wrong");
    }
  }

  const updateName = async ()=> {
    try {
        const { data } = await axios.put(`http://localhost:3000/edit-${decodedToken.role.toLowerCase()}/${id}`, {name})
        localStorage.setItem('token', data.token);
        navigate(0); 
    } catch (error) {
        if(error instanceof AxiosError) {
            if(error.response) {
              const { message } = error.response.data; 
              return toast.error(message ?? "Something went wrong");
            }

        }
          return toast.error("Something went wrong");
    }
  }

  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-center h-[700px]">
        <div className="w-[420px] flex flex-col p-6 bg-white outline-1 outline outline-neutral-200 shadow-md rounded-xl">
          <h1 className="text-2xl font-medium">Your Information</h1>
          <div className="flex flex-col w-[360px] mt-10">
            <p className="text-sm font-medium tracking-wide">Name</p>
            <div className="bg-[#f4f4f5] rounded-lg mb-2 mt-1 flex justify-between pr-3">
              <input className="w-full bg-[#f4f4f5] py-2 px-3 border-[2px] border-black rounded-lg disabled:border-none" value={name} onChange={(e)=> setName(e.target.value)} disabled={edit}/>
              <div className="flex gap-2 items-center ml-2">
              {edit ? null : <button onClick={updateName}><CircleCheck className="w-6 h-6" color="green"/></button>}
              <button onClick={()=> {setEdit(prev => !prev)}}>{edit ? <Pencil className="w-5 h-5"/> : <CircleX className="w-6 h-6" color="red" onClick={()=> setName(decodedToken.name)}/>}</button>
              </div>
            </div>
            <p className="text-sm font-medium tracking-wide mt-2" >
              Email
            </p>
            <p className="bg-[#f4f4f5] px-3 py-2 rounded-lg mb-2 mt-1">{decodedToken.email}</p>
            <p className="text-sm font-medium tracking-wide mt-2" >
              Role
            </p>
            <p className="bg-[#f4f4f5] px-3 py-2 rounded-lg mb-2 mt-1">{decodedToken.role.toLowerCase()}</p>
            <p
              className="text-sm font-medium tracking-wide mt-2"
            >
              {decodedToken.role === "STUDENT" ? "Enrolled in:" : "Current Courses"}
            </p>
            {info.length === 0 ? <p className="bg-[#f4f4f5] px-3 py-2 rounded-lg mb-2 mt-1">None</p> : info.map((info)=> (
              <div key={info.id} className="flex  items-center justify-between bg-[#f4f4f5] px-3 py-2 rounded-lg mb-2 mt-1">
                <p>{info.title}</p>
                {decodedToken.role === "INSTRUCTOR" ? <button className="text-red-500" onClick={()=> deleteCourse(info.id)}><Trash2 className="w-5 h-5"/></button> : null}
              </div>
            ))}
            <button className="bg-red-500 text-white rounded-md py-1.5 font-medium my-3 w-fit px-4 mt-3" onClick={deleteAccount}>Delete Account</button>
          </div>
        </div>
      </div>
      <Toaster />
    </MaxWidthWrapper>
  );
};

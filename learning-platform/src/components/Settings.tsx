import { jwtDecode } from "jwt-decode";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { tokenType } from "./decodeToken";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

interface infoType {
  title: string;
}

export const Settings = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const { id } = useParams();
  const navigate = useNavigate();
  const decodedToken = jwtDecode<tokenType>(token);
  const [info, setInfo] = useState<infoType[]>([]);
  useEffect(() => {
    const getInformation = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/${decodedToken.role.toLowerCase()}-info/${id}`
        );
        setInfo(data.user);
      } catch (error) {
        console.log(error);
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
      console.log(error);
    }
  }
  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-center h-[700px]">
        <div className="w-[420px] flex flex-col p-6 bg-white outline-1 outline outline-neutral-200 shadow-md rounded-xl">
          <h1 className="text-2xl font-medium">Your Information</h1>
          <div className="flex flex-col w-[360px] mt-10">
            <p className="text-sm font-medium tracking-wide">Name</p>
            <p className="bg-[#f4f4f5] px-3 py-2 rounded-lg mb-2 mt-1">{decodedToken.name}</p> 
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
            {info.length === 0 ? <p className="bg-[#f4f4f5] px-3 py-2 rounded-lg mb-2 mt-1">None</p> : info.map((info, i)=> (
              <p key={i} className="bg-[#f4f4f5] px-3 py-2 rounded-lg mb-2 mt-1">{info.title}</p>
            ))}
            <button className="bg-red-500 text-white rounded-md py-1.5 font-medium my-3 w-fit px-4 mt-3" onClick={deleteAccount}>Delete Account</button>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

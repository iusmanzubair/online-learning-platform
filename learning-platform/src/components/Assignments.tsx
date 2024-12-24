import { useEffect, useState } from "react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router";
import { tokenType } from "./decodeToken";
import toast, { Toaster } from "react-hot-toast";

interface AssignmentType {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

export const Assignments = () => {
    const token = localStorage.getItem('token');
    if(!token) 
        return null;
    
    const decodedToken = jwtDecode<tokenType>(token);
    const { courseId } = useParams();
    const navigate = useNavigate();

  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  useEffect(() => {
    const getAssignments = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/assignments/${courseId}`);
        setAssignments(data.assignments);
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

    getAssignments();
  }, []);

  const handleDelete = async (assignId: string)=> {
    try {
      await axios.delete(`http://localhost:3000/assignments/${assignId}`)
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
      <h1 className="text-2xl font-medium mt-16 mb-4">Pending Assignments</h1>
      {assignments.length === 0 ? (
        <div className="h-[500px] flex items-center justify-center">
          <p className="text-lg">No pending assignments</p>
        </div>
      ) : (
        <div>
          {assignments.map((assignment) => (
            <div key={assignment.id} className="flex items-center justify-between border-[1.5px] border-neutral-300 bg-[#f4f4f5] rounded-lg shadow-sm p-4">
              <div>
                <h1 className="text-xl font-medium mb-2">{assignment.title}</h1>
                <p>Task: {assignment.description}</p>
                <p>Due Date: {assignment.dueDate.substring(0, 10)}</p>
              </div>
              {decodedToken.role === "INSTRUCTOR" ? <button className="py-2 px-4 bg-red-500 text-white rounded-lg" onClick={()=> handleDelete(assignment.id)}>Delete</button> : null}
            </div>
          ))}
        </div>
      )}
      <Toaster />
    </MaxWidthWrapper>
  );
};

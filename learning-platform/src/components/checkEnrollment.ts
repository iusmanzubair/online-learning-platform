import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const checkEnrollment = async (studentId: string, courseId: string)=> {
    try {
        const {data} = await axios.get(`http://localhost:3000/enroll?s_id=${studentId}&c_id=${courseId}`)
        return data.isEnrolled;
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
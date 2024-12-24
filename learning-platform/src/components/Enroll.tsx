import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { tokenType } from "./decodeToken";


export const Enroll = ({token, courseId}: {token: string, courseId: number})=> {
    if(!token) 
        return null;
    
    const [isEnrolled, setIsEnrolled] = useState(false);
    const decodedToken = jwtDecode<tokenType>(token);

    const navigate = useNavigate();
    useEffect(()=> {
        const checkEnrollment = async ()=> {
            try {
                const {data} = await axios.get(`http://localhost:3000/enroll?studentId=${decodedToken.id}&courseId=${courseId}`)
                setIsEnrolled(data.isEnrolled);
            } catch (error) {
                console.log(error);
            }
        }
        
        checkEnrollment();
    }, [decodedToken.id, courseId])
    
    const handleEnroll = async ()=> {
       try {
         await axios.post("http://localhost:3000/enroll", {studentId: decodedToken.id, courseId});
         navigate(0);
       } catch (error) {
         console.log(error);
       }
    }

    const deleteEnroll = async ()=> {
        try {
            await axios.delete(`http://localhost:3000/enroll?studentId=${decodedToken.id}&courseId=${courseId}`);
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    }
    return <div>
        {!isEnrolled ?
            <button onClick={handleEnroll} className="py-2 px-4 bg-black text-white rounded-lg">Enroll now</button>
        : <div className="flex gap-1">
            <a href={`/assignments/${courseId}`} className="block py-2 px-4 bg-black text-white rounded-lg"><BookOpen className="w-5 h-5"/></a> 
            <button className="py-2 px-4 bg-red-500 text-white rounded-lg" onClick={deleteEnroll}>Cancel</button>
        </div>
        }
    </div>
}
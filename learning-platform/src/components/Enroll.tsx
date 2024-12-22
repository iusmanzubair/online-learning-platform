import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export const Enroll = ({token, courseId}: {token: string, courseId: number})=> {
    if(!token) 
        return null;
    
    const [isEnrolled, setIsEnrolled] = useState(false);
    const decodedToken = jwtDecode<{id: number, role: "INSTRUCTOR" | "STUDENT"}>(token);

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
        {!isEnrolled ? <button onClick={handleEnroll} className="py-2 px-4 bg-black text-white rounded-lg">Enroll now</button> : <button className="py-2 px-4 bg-red-600 text-white rounded-lg" onClick={deleteEnroll}>Cancel</button>}
    </div>
}
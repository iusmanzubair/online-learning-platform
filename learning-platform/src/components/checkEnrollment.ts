import axios from "axios";

export const checkEnrollment = async (studentId: string, courseId: string)=> {
    try {
        const {data} = await axios.get(`http://localhost:3000/enroll?s_id=${studentId}&c_id=${courseId}`)
        return data.isEnrolled;
    } catch (error) {
        console.log(error);
    }
}
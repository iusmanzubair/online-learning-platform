import axios from "axios"
import { MaxWidthWrapper } from "./MaxWidthWrapper"
import { useEffect, useState } from "react"

interface courseType {
    id: number,
    name: string
}

export const Courses = ()=> {
    const [courses, setCourses] = useState<courseType[]>([]);
    
    useEffect(()=> {
        const getCourses = async ()=> {
            try {
                const {data} = await axios.get("http://localhost:3000/courses");
                setCourses(data.courses);
            } catch (error) {
                console.log(error);
            }
        }
        getCourses();
    }, [])

    return <MaxWidthWrapper>
        <h1 className="text-2xl font-medium">Courses we offer</h1>
        {courses.length > 0 ? (
            courses.map((course)=> (
                <div key={course.id} className="border border-black">
                    <p>{course.name}</p>
                </div>
            ))
        ) : (
            <p>No courses available!</p>
        )
        }
    </MaxWidthWrapper>
}
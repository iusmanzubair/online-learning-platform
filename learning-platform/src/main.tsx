import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Courses } from './components/Courses.tsx'
import { StudentLogin } from './components/StudentLogin.tsx'
import { InstructorLogin } from './components/InstructorLogin.tsx'
import { AddCourse } from './components/AddCourse.tsx'
import { AssignTask } from './components/AssignTast.tsx'
import { Assignments } from './components/Assignments.tsx'
import { Settings } from './components/Settings.tsx'
import { CreateInstructor } from './components/CreateInstructor.tsx'
import { CreateStudent } from './components/CreateStudent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/create-student' element={<CreateStudent/>}/>
        <Route path='/student-login' element={<StudentLogin/>}/>
        <Route path='/create-instructor' element={<CreateInstructor/>}/>
        <Route path='/instructor-login' element={<InstructorLogin/>}/>
        <Route path='/add-course' element={<AddCourse/>}/>
        <Route path='/assignments/:courseId' element={<Assignments/>}/>
        <Route path='/assign-task/:courseId' element={<AssignTask/>}/>
        <Route path='/settings/:id' element={<Settings/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

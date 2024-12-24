import express from 'express'
import { createCourse, deleteCourse, getCourses, searchCourses } from '../controllers/courses.js';

const router = express.Router();

router.get('/courses', getCourses);

router.post('/add-course', createCourse);

router.delete('/delete-course/:id', deleteCourse)

router.get('/search-courses', searchCourses);

export default router
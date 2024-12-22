import express from 'express'
import { createCourse, getCourses } from '../controllers/courses.js';

const router = express.Router();

router.get('/courses', getCourses);

router.post('/add-course', createCourse);

export default router
import express from 'express'
import { createStudent, deleteStudentInfo, getStudentInfo } from '../controllers/students.js';

const router = express.Router();

router.post('/create-student', createStudent);

router.get('/student-info/:id', getStudentInfo);

router.delete('/student-info/:id', deleteStudentInfo);
export default router
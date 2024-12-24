import express from 'express'
import { createStudent, deleteStudentInfo, editStudent, getStudentInfo, loginStudent } from '../controllers/students.js';

const router = express.Router();

router.post('/create-student', createStudent);

router.post('/student-login', loginStudent);

router.get('/student-info/:id', getStudentInfo);

router.delete('/student-info/:id', deleteStudentInfo);

router.put('/edit-student/:id', editStudent);

export default router
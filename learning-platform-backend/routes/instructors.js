import express from 'express'
import { createInstructor, deleteInstructorInfo, editInstructor, getInstructorInfo, loginInstructor } from '../controllers/instructors.js';

const router = express.Router();

router.post('/create-instructor', createInstructor);

router.post('/instructor-login', loginInstructor);

router.get('/instructor-info/:id', getInstructorInfo);

router.delete('/instructor-info/:id', deleteInstructorInfo);

router.put('/edit-instructor/:id', editInstructor);

export default router
import express from 'express'
import { createInstructor, deleteInstructorInfo, getInstructorInfo } from '../controllers/instructors.js';

const router = express.Router();

router.post('/create-instructor', createInstructor);

router.get('/instructor-info/:id', getInstructorInfo);

router.delete('/instructor-info/:id', deleteInstructorInfo);

export default router
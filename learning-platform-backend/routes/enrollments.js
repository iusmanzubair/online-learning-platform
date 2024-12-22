import express from 'express'
import { addEnrollment, checkEnrollment, deleteEnrollment } from '../controllers/enrollments.js';

const router = express.Router();

router.post('/enroll', addEnrollment);

router.get('/enroll', checkEnrollment)

router.delete('/enroll', deleteEnrollment)

export default router
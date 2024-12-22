import express from 'express'
import { createStudent } from '../controllers/students.js';

const router = express.Router();

router.post('/create-student', createStudent);

export default router
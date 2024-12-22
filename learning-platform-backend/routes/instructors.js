import express from 'express'
import { createInstructor } from '../controllers/instructors.js';

const router = express.Router();

router.post('/create-instructor', createInstructor);

export default router
import express from 'express'
import { assignTask } from '../controllers/assignments.js';

const router = express.Router();

router.post("/assign-task", assignTask);

export default router
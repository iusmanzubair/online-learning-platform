import express from 'express'
import { assignTask, deleteAssignment, getAssignments } from '../controllers/assignments.js';

const router = express.Router();

router.post("/assign-task", assignTask);

router.get("/assignments/:courseId", getAssignments);

router.delete("/assignments/:assignId", deleteAssignment);

export default router
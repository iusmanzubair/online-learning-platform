import db from "../database/db.js";

export const assignTask = async(req, res)=> {
    try {
        const {title, description, dueDate, courseId} = req.body;

        await db.query(`INSERT INTO Assignments (courseId, title, description, dueDate) VALUES (?, ?, ?, ?)`, [courseId, title, description, dueDate]);
        res.status(200).json({
            success: true,
            message: "Task assigned successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to assign task!"
        })
    }
}

export const getAssignments = async (req, res)=> {
    try {
        const {courseId} = req.params;
        const [assignments] = await db.query(`SELECT * FROM Assignments WHERE courseId=?`, courseId);
        res.status(200).json({
            success: true,
            assignments
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to fetch assignments!"
        })
    }
}

export const deleteAssignment = async (req, res)=> {
    try {
        const {assignId} = req.params;
        await db.query(`DELETE FROM Assignments WHERE id=?`, assignId);
        res.status(200).json({
            success: true,
            message: "Assignment deleted successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to delete assignment!"
        })
    }
}
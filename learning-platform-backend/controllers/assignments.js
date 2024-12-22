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
import db from "../database/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export const createInstructor = async (req, res)=> {
    try {
        const {name, email, password} = req.body;
        const [user] = await db.query(`SELECT * FROM Instructors WHERE email=?`, email);
        if(!user || user.length === 0)  
            await db.query(`INSERT INTO Instructors (name, email, password) VALUES (?, ?, ?)`, [name, email, password]);

        const token = jwt.sign({ id: user[0].id, email, name, role: 'INSTRUCTOR' }, process.env.JWT_SECRET, {expiresIn: '1h'})
        
        res.status(200).json({
            success: true,
            token
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to create instructor!"
        })
    }
}

export const getInstructorInfo = async (req, res) => {
  try {
        const { id } = req.params;
        const [user] = await db.query(`SELECT c.title FROM Instructors i INNER JOIN Courses c ON i.id = c.instructorId WHERE i.id=?`, id);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to fetch instructor!",
        });
    }
};

export const deleteInstructorInfo = async (req, res)=> {
  try {
        const {id} = req.params;
        await db.query(`DELETE FROM Courses WHERE instructorId=?`, id);
        await db.query(`DELETE FROM Instructors WHERE id=?`, id);
        res.status(200).json({
            success: true,
            message: "Instructor deleted successfully"
        }) 
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to delete instructor!",
        });
    }
}
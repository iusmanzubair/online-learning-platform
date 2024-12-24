import db from "../database/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export const createInstructor = async (req, res)=> {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                succes: false,
                message: "Unable to create instructor"
            })
        }

        const [user] = await db.query(`SELECT * FROM Instructors WHERE email=?`, email);
        if(user.length !== 0) {
            return res.status(400).json({
                succes: false,
                message: "User already exists"
            })
        }

        await db.query(`INSERT INTO Instructors (name, email, password) VALUES (?, ?, ?)`, [name, email, password]);

        
        res.status(200).json({
            success: true,
            message: "User created successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to create instructor"
        })
    }
}

export const loginInstructor = async (req, res)=> {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Unable to login instructor"
            })
        }

        const [user] = await db.query(`SELECT * FROM Instructors WHERE email=?`, email);
        if(!user || user.length === 0) {
            return res.status(400).json({
                success: false,
                message: "User does not exists"
            })
        }

        if(user[0].password !== password) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({ id: user[0].id, email, name: user[0].name, role: 'INSTRUCTOR' }, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(200).json({
            success: true,
            token
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to login instructor"
        })
    }
}

export const getInstructorInfo = async (req, res) => {
  try {
        const { id } = req.params;
        const [courses] = await db.query(`SELECT c.id, c.title FROM Instructors i INNER JOIN Courses c ON i.id = c.instructorId WHERE i.id=?`, id);
        res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to fetch instructor",
        });
    }
};

export const deleteInstructorInfo = async (req, res)=> {
  try {
        const { id } = req.params;
        await db.query(`DELETE FROM Courses WHERE instructorId=?`, id);
        await db.query(`DELETE FROM Instructors WHERE id=?`, id);
        res.status(200).json({
            success: true,
            message: "Instructor deleted successfully"
        }) 
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to delete instructor",
        });
    }
}

export const editInstructor = async (req, res)=> {
    try {
        const { id } = req.params;
        const { name } = req.body

        await db.query(`UPDATE Instructors SET name=? WHERE id=?`, [name, id]);

        const [user] = await db.query(`SELECT * FROM Instructors WHERE id=?`, id);

        const token = jwt.sign({ id: user[0].id, name: user[0].name, email: user[0].email, role: "INSTRUCTOR"}, process.env.JWT_SECRET, {expiresIn: "1h"})

        res.status(200).json({
            success: true,
            token
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to edit instructor",
        });
    }
}
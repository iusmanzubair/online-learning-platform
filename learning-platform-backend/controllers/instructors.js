import db from "../database/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export const createInstructor = async (req, res)=> {
    try {
        const {name, email, password} = req.body;
        const [user] = await db.query(`SELECT email FROM Instructors WHERE email=?`, email);
        if(!user || user.length === 0)  
            await db.query(`INSERT INTO Instructors (name, email, password) VALUES (?, ?, ?)`, [name, email, password]);

        const token = jwt.sign({ email, role: 'INSTRUCTOR' }, process.env.JWT_SECRET, {expiresIn: '1h'})
        
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
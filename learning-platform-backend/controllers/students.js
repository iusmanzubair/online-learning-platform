import db from "../database/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export const createStudent = async (req, res)=> {
    try {
        const {name, email, password} = req.body;
        const [user] = await db.query(`SELECT * FROM Students WHERE email=?`, email);
        if(!user || user.length === 0)  
            await db.query(`INSERT INTO Students (name, email, password) VALUES (?, ?, ?)`, [name, email, password]);

        const token = jwt.sign({ id: user[0].id, email, role: "STUDENT" }, process.env.JWT_SECRET, {expiresIn: '1h'})
        
        res.status(200).json({
            success: true,
             token
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to create student!"
        })
    }
}
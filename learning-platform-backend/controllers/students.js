import db from "../database/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createStudent = async (req, res)=> {
  try {
      const { name, email, password } = req.body;

      if(!name || !email || !password) {
          return res.status(400).json({
              succes: false,
              message: "Unable to create student"
          })
      }

      const [user] = await db.query(`SELECT * FROM Students WHERE email=?`, email);
      if(user.length !== 0) {
          return res.status(400).json({
              succes: false,
              message: "User already exists"
          })
      }

      await db.query(`INSERT INTO Students (name, email, password) VALUES (?, ?, ?)`, [name, email, password]);

        
      res.status(200).json({
          success: true,
          message: "User created successfully"
      })
  } catch (error) {
      res.status(400).json({
          success: false,
          message: "Unable to create student"
      })
  }
}

export const loginStudent = async (req, res)=> {
  try {
      const { email, password } = req.body;

      if(!email || !password) {
          return res.status(400).json({
              success: false,
              message: "Unable to login student"
          })
      }

      const [user] = await db.query(`SELECT * FROM Students WHERE email=?`, email);
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

      const token = jwt.sign({ id: user[0].id, email, name: user[0].name, role: 'STUDENT' }, process.env.JWT_SECRET, {expiresIn: '1h'})
      res.status(200).json({
          success: true,
          token
      })
  } catch (error) {
      res.status(400).json({
          success: false,
          message: "Unable to login student"
      })
    }
}

export const getStudentInfo = async (req, res) => {
  try {
      const { id } = req.params;
      const [courses] = await db.query(`SELECT c.title FROM Students s INNER JOIN Enrollments e ON s.id = e.studentId INNER JOIN Courses c ON e.courseId = c.id WHERE s.id=?`, id);

      res.status(200).json({
        success: true,
        courses,
      });
  } catch (error) {
      res.status(400).json({
        success: false,
        message: "Unable to fetch student",
      });
  }
};

export const deleteStudentInfo = async (req, res)=> {
  try {
      const { id } = req.params;
      await db.query(`DELETE FROM Enrollments WHERE studentId=?`, id);
      await db.query(`DELETE FROM Students WHERE id=?`, id);
      res.status(200).json({
        success: true,
        message: "Student deleted successfully"
      }) 
  } catch (error) {
      res.status(400).json({
        success: false,
        message: "Unable to delete student",
      });
  }
}

export const editStudent = async (req, res)=> {
    try {
        const { id } = req.params;
        const { name } = req.body

        await db.query(`UPDATE Students SET name=? WHERE id=?`, [name, id]);

        const [user] = await db.query(`SELECT * FROM Students WHERE id=?`, id);

        const token = jwt.sign({ id: user[0].id, name: user[0].name, email: user[0].email, role: "STUDENT"}, process.env.JWT_SECRET, {expiresIn: "1h"})

        res.status(200).json({
            success: true,
            token
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to edit student",
        });
    }
}
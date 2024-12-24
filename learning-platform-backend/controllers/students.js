import db from "../database/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [user] = await db.query(
      `SELECT * FROM Students WHERE email=?`,
      email
    );
    if (!user || user.length === 0)
      await db.query(
        `INSERT INTO Students (name, email, password) VALUES (?, ?, ?)`,
        [name, email, password]
      );

    const token = jwt.sign(
      { id: user[0].id, email, name, role: "STUDENT" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create student!",
    });
  }
};

export const getStudentInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const [user] = await db.query(
      `SELECT c.title FROM Students s INNER JOIN Enrollments e ON s.id = e.studentId INNER JOIN Courses c ON e.courseId = c.id WHERE s.id=?`, id
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to fetch student!",
    });
  }
};

export const deleteStudentInfo = async (req, res)=> {
  try {
    const {id} = req.params;
    await db.query(`DELETE FROM Enrollments WHERE studentId=?`, id);
    await db.query(`DELETE FROM Students WHERE id=?`, [id]);
    res.status(200).json({
      success: true,
      message: "Student deleted successfully"
    }) 
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to delete student!",
    });
  }
}

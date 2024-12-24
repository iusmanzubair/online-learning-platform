import db from '../database/db.js'

export const getCourses = async (req, res)=> {
    try {
        const [courses] = await db.query("SELECT co.id, co.title, co.description, ca.name as category, i.name as instructor FROM Courses co INNER JOIN Categories ca ON co.categoryId = ca.id INNER JOIN Instructors i ON co.instructorId = i.id");
        res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Unable to fetch courses"
        })
    }
}

export const createCourse = async(req, res) => {
    try {
        const {title, description, category, instructorEmail} = req.body;

        if(!title || !description || !category || !instructorEmail) {
            return res.status(400).json({
                success: false,
                message: "Unable to create course"
            })
        }

        let [categoryId] = await db.query(`SELECT id FROM Categories WHERE name=?`, category);

        if(categoryId.length === 0 || !categoryId) {
            [categoryId] = await db.query(`INSERT INTO Categories (name) VALUES (?)`, category);
        }

        const [instructorId] = await db.query(`SELECT id FROM Instructors WHERE email=?`, instructorEmail);

        await db.query(`INSERT INTO Courses (title, description, categoryId, instructorId) VALUES (?, ?, ?, ?)`, [title, description, categoryId.insertId ?? categoryId[0].id, instructorId[0].id]);

        res.status(200).json({
            success: true,
            message: "Course created successfully"
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Unable to create course"
        })
    }
}

export const deleteCourse = async (req, res)=> {
    try {
        const { id } = req.params;

        await db.query(`DELETE FROM Courses WHERE id=?`, id);

        res.status(200).json({
            success: false,
            message: "Course deleted successfully"
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Unable to delete course"
        })
    }
}

export const searchCourses = async (req, res)=> {
    try {
        const { query } = req.query;

        const searchFor = `%${query}%`
        const [courses] = await db.query(`SELECT co.id, co.title, co.description, ca.name as category, i.name as instructor FROM Courses co INNER JOIN Categories ca ON co.categoryId = ca.id INNER JOIN Instructors i ON co.instructorId = i.id WHERE co.title LIKE ?`, searchFor);

        res.status(200).json({
            success: true,
            courses
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Unable to search course"
        })
    }
}
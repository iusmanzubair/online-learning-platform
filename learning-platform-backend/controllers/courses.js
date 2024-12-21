import db from '../database/db.js'

export const getCourses = async (req, res)=> {
    try {
        const [courses] = await db.query("select * from courses");
        res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Unable to fetch courses!"
        })
    }
}
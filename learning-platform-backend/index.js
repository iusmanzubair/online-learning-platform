import express, { json } from 'express'
import dotenv from 'dotenv'
import coursesRoutes from './routes/courses.js'
import cors from 'cors'
import createDatabase from './database/createDatabase.js'
import createTables from './database/createTables.js'
import studentRoutes from './routes/students.js'
import instructorRoutes from './routes/instructors.js'
import enrollRoutes from "./routes/enrollments.js"
import assignmentRoutes from './routes/assignments.js'

dotenv.config()
const app = express();

app.use(cors())
app.use(json());
createDatabase();
createTables();

app.use('/', coursesRoutes);
app.use('/', studentRoutes);
app.use('/', instructorRoutes);
app.use('/', enrollRoutes);
app.use('/', assignmentRoutes);
app.listen(process.env.PORT, ()=> {
    console.log(`Server is running at Port ${process.env.PORT}`);
})
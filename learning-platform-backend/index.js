import express from 'express'
import dotenv from 'dotenv'
import coursesRoutes from './routes/courses.js'
import cors from 'cors'
import createDatabase from './database/createDatabase.js'
import createTables from './database/createTables.js'

dotenv.config()
const app = express();

app.use(cors())
createDatabase();
createTables();

app.use('/', coursesRoutes);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running at Port ${process.env.PORT}`);
})
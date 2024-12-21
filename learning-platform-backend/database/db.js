import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: process.env.DATABASE_PASSWORD,
    database: 'learningPlatform'
})

export default pool.promise()
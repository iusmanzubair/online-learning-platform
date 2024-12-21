import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config();

const createDatabase = async ()=> {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'admin',
            password: process.env.DATABASE_PASSWORD
        })

        console.log("Connected to database successfully");

        const databaseName = "learningPlatform";

        connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
        
        connection.end();
    } catch (error) {
        console.log(error)
    }
}

export default createDatabase
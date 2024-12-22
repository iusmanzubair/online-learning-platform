import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config();

const createTables = async ()=> {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "admin",
            password: process.env.DATABASE_PASSWORD
        })

        connection.query('USE learningPlatform');

        const createStudentTable = `
            CREATE TABLE IF NOT EXISTS Students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `

        connection.query(createStudentTable);

        const createInstructorTable = `
            CREATE TABLE IF NOT EXISTS Instructors (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `

        connection.query(createInstructorTable);

        const createCategoriesTable = `
            CREATE TABLE IF NOT EXISTS Categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL
            );
        `

        connection.query(createCategoriesTable);

        const createCourseTable = `
            CREATE TABLE IF NOT EXISTS Courses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                description TEXT,
                categoryId INT NOT NULL,
                instructorId INT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (categoryId) REFERENCES Categories(id),
                FOREIGN KEY (instructorId) REFERENCES Instructors(id)
            )
        `
        
        connection.query(createCourseTable);

        const createEnrollmentsTable = `
            CREATE TABLE IF NOT EXISTS Enrollments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                studentId INT NOT NULL,
                courseId INT NOT NULL,
                enrollmentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (studentId) REFERENCES Students(id),
                FOREIGN KEY (courseId) REFERENCES Courses(id)
            );
        `

        connection.query(createEnrollmentsTable);

        const createAssignmentTable = `
            CREATE TABLE IF NOT EXISTS Assignments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                courseId INT NOT NULL,
                title VARCHAR(200) NOT NULL,
                description TEXT,
                dueDate DATE,
                FOREIGN KEY (courseId) REFERENCES Courses(id)
            );
        `
        
        connection.query(createAssignmentTable);

        connection.end();
    } catch (error) {
        console.log(error);
    }
}

export default createTables;
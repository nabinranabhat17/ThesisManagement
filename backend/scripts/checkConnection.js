import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Load environment variables from .env file
dotenv.config({ path: join(rootDir, ".env") });

async function checkConnection() {
  try {
    // Check if .env file exists
    const envPath = join(rootDir, ".env");
    if (!fs.existsSync(envPath)) {
      console.error("Error: .env file not found");
      console.log("Please create a .env file with database credentials");
      process.exit(1);
    }

    // Create database connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.log("MySQL connection established successfully");

    // Check if database exists
    const [rows] = await connection.execute(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
      [process.env.DB_NAME]
    );

    if (rows.length === 0) {
      console.log(`Database '${process.env.DB_NAME}' does not exist.`);
      console.log(`Creating database '${process.env.DB_NAME}'...`);
      await connection.execute(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
      );
      console.log(`Database '${process.env.DB_NAME}' created successfully.`);
    } else {
      console.log(`Database '${process.env.DB_NAME}' exists.`);
    }

    // Close connection
    await connection.end();

    console.log("Connection test completed successfully.");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
}

checkConnection();

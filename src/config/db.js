import mysql from "mysql2/promise";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from "./envLoader.js";
import initDb from "../db/initDb.js";

export const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    await initDb(pool);
    connection.release();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

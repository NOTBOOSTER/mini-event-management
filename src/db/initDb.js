import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} from "../config/envLoader.js";

import mysql from "mysql2/promise";

import Logger from "../utils/logger.js";
import pool from "../config/db.js";
const logger = new Logger("DATABASE");

const initDb = async () => {
  try {
    logger.info("Initializing database...");
    const conn = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await conn.query(`
            CREATE DATABASE IF NOT EXISTS ${DB_NAME}
        `);

    await conn.query(`
            USE ${DB_NAME}
        `);

    await conn.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE (email)
            );
        `);

    await conn.query(`
            CREATE TABLE IF NOT EXISTS events (
                id INT NOT NULL AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                date DATETIME NOT NULL,
                total_capacity INT NOT NULL,
                remaining_tickets INT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );
        `);

    await conn.query(`
            CREATE TABLE IF NOT EXISTS bookings (
                id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL,
                event_id INT NOT NULL,
                tickets_booked INT NOT NULL DEFAULT 1,
                confirmation_code VARCHAR(16) NOT NULL,
                booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE (confirmation_code),
                UNIQUE (user_id, event_id),
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (event_id) REFERENCES events(id)
            );
        `);

    await conn.query(`
            CREATE TABLE IF NOT EXISTS event_attendance (
                id INT NOT NULL AUTO_INCREMENT,
                booking_id INT NOT NULL,
                user_id INT NOT NULL,
                event_id INT NOT NULL,
                entry_time DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE (booking_id),
                FOREIGN KEY (booking_id) REFERENCES bookings(id),
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (event_id) REFERENCES events(id)
            );
        `);
    await conn.end();
    logger.success("Database and tables ready");
    await pool.getConnection().then((connection) => {
      connection.release();
      logger.success("Database connection pool initialized");
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

export default initDb;
